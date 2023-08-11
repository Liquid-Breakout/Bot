import axios, { AxiosPromise, AxiosRequestConfig } from "axios"
import sockjsServer from "sockjs"
import sockjsClient from "sockjs-client"
import { Guid } from "guid-typescript"
import express, {Express, Request, Response} from "express"
import { Log, Warn } from "./Logger";
import { createServer } from "http"
import { recursiveBenchmark, operationsBenchmark } from "./CpuBenchmark"

// Type guards
function isSocketClient(socket: any): socket is WebSocket {
    return socket.send != undefined;
}

function isSocketServer(socket: any): socket is sockjsServer.Server {
    return socket.installHandlers != undefined;
}

async function sleepUntil(checkFunc: any, timeout?: number) {
    return new Promise((resolve, _) => {
        const startTime = new Date();
        const waitInterval = setInterval(() => {
            if (timeout ? (checkFunc() || (new Date()).getTime() - startTime.getTime() >= timeout) : checkFunc()) {
                clearInterval(waitInterval);
                resolve(null);
            }
        }, 20);
    })
}

function data(socketMessage: string) {
    return JSON.parse(socketMessage);
}

class WorkerBase {
    public _socketCommunicator: WebSocket | sockjsServer.Server | undefined = undefined;
    public _bindedUrls: {[url: string]: any} = {};

    public bind(url: string, processFunc: any, mustBeBalancer?: boolean) {
        if (mustBeBalancer) {
            return;
        }
        this._bindedUrls[url] = processFunc;
    }
}

class Balancer extends WorkerBase {
    private _serverApp: Express;
    private _registeredWorkers: {[workerId: string]: {connection: sockjsServer.Connection, info: {jobsProcessing: number, processPower: number, healthCheckRespond: number}}} = {};
    private _jobsData: {[url: string]: {
        workersReady: string[], // Keep track of workers ready to process
        workersFailed: string[], // Keep track of workers failed to do the job
        results: {[jobId: string]: any}, // Keep track of results workers returned
        processPowerRequired: number // How powerful the worker needs to be to do the job
    }} = {};

    public WorkerAvaliable: boolean = false;

    public sendMessage(data: any) {
        if (isSocketServer(this._socketCommunicator)) {
            const sendingData = JSON.stringify(data);
            if (data.worker) {
                if (this._registeredWorkers[data.worker]) {
                    this._registeredWorkers[data.worker].connection.write(sendingData);
                } else {
                    Warn(`WorkerManager: Worker ${data.worker} is not connected, cannot send message`);
                }
            } else {
                Object.values(this._registeredWorkers).forEach((workerData) => {
                    workerData.connection.write(sendingData);
                })
            }
        }
    }

    public connect() {
        const serverListener = createServer(this._serverApp);

        this._socketCommunicator = sockjsServer.createServer({prefix: "/balancerSocket"});
        this._socketCommunicator.installHandlers(serverListener);

        serverListener.listen(8080, '0.0.0.0');
        
        if (!isSocketServer(this._socketCommunicator)) {
            return;
        }

        this._socketCommunicator.on("connection", (connection: sockjsServer.Connection) => {
            Log("WorkerManager: New Socket client connected.");
            connection.on("data", (message: any) => {
                const receivedData = data(message);
                if (!receivedData || !receivedData.workerInfo) {
                    return;
                }
                if (receivedData.type == "connect") {
                    if (this._registeredWorkers[receivedData.workerInfo.id] === undefined) {
                        Log(`WorkerManager: Registered worker ${receivedData.workerInfo.id}`);
                        this._registeredWorkers[receivedData.workerInfo.id] = {
                            connection: connection,
                            info: {
                                jobsProcessing: 0,
                                healthCheckRespond: (new Date()).getTime(),
                                processPower: receivedData.workerInfo.processPower
                            }
                        };
                        this.WorkerAvaliable = true;
                    }
                } else {
                    if (this._registeredWorkers[receivedData.workerInfo.id] === undefined) {
                        return this.sendMessage({worker: receivedData.workerInfo.id, type: "disconnected"});
                    }
                    // Update worker info
                    this._registeredWorkers[receivedData.workerInfo.id].info.jobsProcessing = receivedData.workerInfo.jobsProcessing;
                    this._registeredWorkers[receivedData.workerInfo.id].info.processPower = receivedData.workerInfo.processPower;

                    if (receivedData.type == "workerReady") {
                        if (receivedData.url && this._jobsData[receivedData.url]) {
                            Log(`WorkerManager: Worker ${receivedData.workerInfo.id} now ready for ${receivedData.url}`);
                            this._jobsData[receivedData.url].workersReady.push(receivedData.workerInfo.id);
                        }
                    } else if (receivedData.type == "jobResult") {
                        if (receivedData.url && receivedData.jobId && receivedData.result && this._jobsData[receivedData.url]) {
                            Log(`WorkerManager: Job ${receivedData.jobId} finished by worker ${receivedData.workerInfo.id}`);
                            this._jobsData[receivedData.url].results[receivedData.jobId] = receivedData.result;
                        }
                    } else if (receivedData.type == "workerHealth") {
                        this._registeredWorkers[receivedData.workerInfo.id].info.healthCheckRespond = (new Date()).getTime();
                    }
                }
            });
        });

        // Send health check to all workers
        setInterval(async () => {
            Log("WorkerManager: Begin workers health check");
            this.sendMessage({type: "healthCheck"});
            const timeframeStart: number = (new Date()).getTime();
            await sleepUntil(() => false, 5000); // 5 seconds timeframe
            const timeframeEnd: number = (new Date()).getTime();

            Object.keys(this._registeredWorkers).forEach((workerId: string) => {
                if (this._registeredWorkers[workerId].info.healthCheckRespond > timeframeEnd) {
                    Warn(`WorkerManager: Worker ${workerId} failed to respond for health check within ${(timeframeEnd - timeframeStart) / 1000} seconds, disconnecting.`);
                    delete this._registeredWorkers[workerId];
                    Object.values(this._jobsData).forEach((jobInfo) => {
                        const indexInReady = jobInfo.workersReady.indexOf(workerId);
                        if (indexInReady !== -1) {
                            jobInfo.workersReady.splice(indexInReady, 1);
                        }
                        const indexInFailed = jobInfo.workersFailed.indexOf(workerId);
                        if (indexInFailed !== -1) {
                            jobInfo.workersFailed.splice(indexInFailed, 1);
                        }
                    })
                }
            })

            if (Object.keys(this._registeredWorkers).length == 0) {
                this.WorkerAvaliable = false;
            }
        }, 10000); // Every 10 seconds
    }

    public override bind(url: string, processFunc: any, mustBeBalancer?: boolean, processPower?: number) {
        this._bindedUrls[url] = processFunc;
        this._jobsData[url] = {
            workersReady: [],
            workersFailed: [],
            results: {},
            processPowerRequired: processPower || 0
        };

        this._serverApp.get(url, async (Request: Request, Response: Response) => {
            var workerCanProcess = this.WorkerAvaliable && !mustBeBalancer;
            if (workerCanProcess) {
                Log(`WorkerManager: Finding workers for '${url}'...`);
                this.sendMessage({type: "requestWorker", url: url});
                await sleepUntil(() => this._jobsData[url].workersReady.length > 0, 2000); // 2 seconds timeframe
                workerCanProcess = this._jobsData[url].workersReady.length > 0;
                if (workerCanProcess) {
                    // Filter out failed workers
                    this._jobsData[url].workersFailed.forEach((workerId: string) => {
                        const foundIndex: number = this._jobsData[url].workersReady.indexOf(workerId);
                        if (foundIndex !== -1) {
                            this._jobsData[url].workersReady.splice(foundIndex, 1);
                        }
                    });

                    // Find the least busy worker and most powerful
                    this._jobsData[url].workersReady.sort((workerA, workerB) => {
                        const workerAInfo = this._registeredWorkers[workerA].info;
                        const workerBInfo = this._registeredWorkers[workerB].info;

                        if (workerAInfo && workerBInfo) {
                            if (workerAInfo.jobsProcessing < workerBInfo.jobsProcessing) {
                                let push = -1
                                if (workerAInfo.processPower > workerBInfo.processPower) {
                                    push = 1;
                                }
                                if (workerAInfo.processPower >= this._jobsData[url].processPowerRequired) {
                                    push = 1;
                                } else if (workerBInfo.processPower >= this._jobsData[url].processPowerRequired) {
                                    push = -1;
                                }
                                return push
                            } else if (workerBInfo.jobsProcessing < workerAInfo.jobsProcessing) {
                                let push = -1
                                if (workerBInfo.processPower > workerAInfo.processPower) {
                                    push = 1;
                                }
                                if (workerBInfo.processPower >= this._jobsData[url].processPowerRequired) {
                                    push = 1;
                                } else if (workerAInfo.processPower >= this._jobsData[url].processPowerRequired) {
                                    push = -1;
                                }
                                return push
                            }
                        } else {
                            if (workerAInfo) {
                                if (workerAInfo.processPower >= this._jobsData[url].processPowerRequired) {
                                    return 1;
                                } else {
                                    return -1
                                }
                            } else {
                                if (workerBInfo.processPower >= this._jobsData[url].processPowerRequired) {
                                    return 1;
                                } else {
                                    return -1
                                }
                            }
                        }

                        return 0;
                    })

                    let selectedWorker = this._jobsData[url].workersReady[0];
                    let preparedQuery = Request.query;
                    let preparedParams = Request.params
                    let newJobId = Guid.create().toString();

                    Log(`WorkerManager: Worker chosen for '${url}': ${selectedWorker} (jobsProcessing: ${this._registeredWorkers[selectedWorker].info.jobsProcessing}, processPower: ${this._registeredWorkers[selectedWorker].info.processPower}), job ID: ${newJobId}`);

                    this._jobsData[url].workersReady.splice(0, 1);
                    this.sendMessage({
                        type: "assignJob",
                        worker: selectedWorker,
                        jobId: newJobId,
                        url: url,
                        query: preparedQuery,
                        params: preparedParams
                    });
                    await sleepUntil(() => this._jobsData[url].results[newJobId] != undefined, 50000); // 50 seconds timeframe

                    const results = this._jobsData[url].results[newJobId];
                    if (results) {
                        Response.status(results.statusCode).send(results.data);
                    } else {
                        this._jobsData[url].workersFailed.push(selectedWorker);
                        Response.status(500).send("Worker failed to complete job.");
                    }
                    delete this._jobsData[url].results[newJobId];
                }
            }
            if (!workerCanProcess) {
                if (mustBeBalancer) {
                    Log(`WorkerManager: Process '${url}' must be done by Balancer, processing...`);
                } else {
                    Warn(`WorkerManager: No worker avaliable to process, Balancer will now take over '${url}'...`);
                }
                try {
                    if (processFunc.constructor.name === "AsyncFunction") {
                        await processFunc(Request, Response);
                    } else {
                        processFunc(Request, Response);
                    }
                } catch (exception) {
                    if (typeof exception === "string") {
                        Response.status(500).send(exception);
                    } else if (exception instanceof Error) {
                        Response.status(500).send(exception.message);
                    } else {
                        Response.status(500).send("Server (Balancer) encountered an error.");
                    }
                }
            }
        })
    }

    constructor(_: any) {
        super()

        this._serverApp = express();
    }
}

class WorkerRequest {
    public query: {[queryName: string]: string | undefined} = {};
    public params: {[paramName: string]: string | undefined} = {};

    constructor(query: {[queryName: string]: string | undefined}, params: {[paramName: string]: string | undefined}) {
        this.query = query;
        this.params = params;
    }
}

class WorkerResponse {
    public data: string = "";
    public statusCode: number = 200;
    public sendFired: boolean = false;

    public serialize() {
        return {data: this.data, statusCode: this.statusCode};
    }

    public send(data: any) {
        if (typeof data === "number") {
            data = data.toString();
        }
        if (typeof data !== "string" && typeof data !== "number") {
            data = JSON.stringify(data);
        }

        this.data = data;
        this.sendFired = true;
    }

    public status(code: number) {
        this.statusCode = code;
        return this;
    }
}

class Worker extends WorkerBase {
    private _socketUrl: string;
    public _id: string = "Unknown"; // Used to identify workers
    public jobsProcessing: number = 0; // Used for balancer
    public processPower: number = 0; // Used to determine how powerful the worker is

    public sendMessage(data: any) {
        data.workerInfo = {id: this._id, jobsProcessing: this.jobsProcessing, processPower: this.processPower};
        if (isSocketClient(this._socketCommunicator)) {
            this._socketCommunicator.send(JSON.stringify(data));
        }
    }

    public async connect() {
        this._socketCommunicator = new sockjsClient(`https://${this._socketUrl}/balancerSocket`);
        this.processPower = operationsBenchmark(2250) / recursiveBenchmark(35) / 200;
        Log(`WorkerManager: Process Power: ${this.processPower}`);
        
        if (!isSocketClient(this._socketCommunicator)) {
            Warn("Socket object not a Client (HUHHH???)")
            return;
        }

        let socketOpened: boolean = false;

        this._socketCommunicator.addEventListener("open", () => {
            socketOpened = true;
            Log(`WorkerManager: Balancer socket opened, connection can be established`);
             // Connect to Balancer
            Log(`WorkerManager: Connecting to Balancer`);
            this.sendMessage({type: "connect"});
        })

        this._socketCommunicator.addEventListener("message", (message) => {
            const receivedData = data(message.data);
            if (!receivedData) {
                return;
            }
            Log(`WorkerManager: Received message: ${message.data}`);
            if (receivedData.type == "requestWorker") {
                if (this._bindedUrls[receivedData.url]) {
                    Log(`WorkerManager: Worker ready for '${receivedData.url}'`);
                    this.sendMessage({type: "workerReady", url: receivedData.url});
                }
            } else if (receivedData.type == "healthCheck") {
                Log(`WorkerManager: Responding to Balancer's health check`);
                this.sendMessage({type: "workerHealth"});
            } else if (receivedData.type == "disconnected") {
                Log(`WorkerManager: Disconnected, reconnecting to Balancer`);
                this.sendMessage({type: "connect"});
            } else if (receivedData.type == "assignJob") {
                if (receivedData.worker == this._id) {
                    // Create fake Request, Response object
                    // We only need neccessary data

                    this.jobsProcessing += 1;
                    Log(`WorkerManager (Job ${receivedData.jobId}): Preparing objects for request.`);
                    
                    const jobRequest = new WorkerRequest(receivedData.query, receivedData.params);
                    const jobResponse = new WorkerResponse();

                    (async () => {
                        try {
                            Log(`WorkerManager (Job ${receivedData.jobId}): Processing request.`);
                            if (this._bindedUrls[receivedData.url].constructor.name === "AsyncFunction") {
                                await this._bindedUrls[receivedData.url](jobRequest, jobResponse);
                            } else {
                                this._bindedUrls[receivedData.url](jobRequest, jobResponse);
                            }
                            await sleepUntil(() => jobResponse.sendFired == true, 30000);
                        } catch (exception) {
                            Log(`WorkerManager (Job ${receivedData.jobId}): Error encountered. (${exception})`);
                            if (typeof exception === "string") {
                                jobResponse.status(500).send(exception);
                            } else if (exception instanceof Error) {
                                jobResponse.status(500).send(exception.message);
                            } else {
                                jobResponse.status(500).send("Worker encountered an error.");
                            }
                        } finally {
                            this.jobsProcessing -= 1;
                            Log(`WorkerManager (Job ${receivedData.jobId}): Sending result to Balancer.`);
                            this.sendMessage({type: "jobResult", url: receivedData.url, jobId: receivedData.jobId, result: jobResponse.serialize()});
                        }
                    })();
                }
            }
        });

        // Run a check to update worker's status
        setInterval(async () => {
            if (!socketOpened) {
                return;
            }
            this.processPower = operationsBenchmark(2000) / recursiveBenchmark(35) / 200;
            this.sendMessage({type: "check"});
        }, 30000)
    }

    constructor(workerId: string, balancerUrl: string) {
        super();

        this._id = workerId;
        this._socketUrl = balancerUrl;
    }
}

export {Balancer, Worker}