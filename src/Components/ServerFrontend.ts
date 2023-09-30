// Handle the requests inputs.
// The Frontend ensures all arguments are correct before passing the processing to the Backend.

import { Balancer, Worker } from "./WorkerManager"
import { Log, Warn } from "../Utilities/Logger";
import { ServerBackendV2 } from "./ServerBackend";

const HTTP_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    AUTH_ERROR: 401,
    INTERNAL_SERVER_ERROR: 500
}

const COMMON_SERVER_ERRORS = {
    API_KEY_ERROR: "API_KEY_ERROR",
    INVALID_QUERY: "INVALID_QUERY",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR"
}

type RequestQueries = {[queryName: string]: any};
type RequestHandlerFunction = ((queries: {[queryName: string]: string}) => ResponseDefiner);
type RequestAsyncHandlerFunction = ((queries: {[queryName: string]: string}) => Promise<ResponseDefiner>);

class RequestDefiner {
    private _frontend: ServerFrontendV2 | undefined = undefined;
    private _handlerFunction: RequestHandlerFunction | RequestAsyncHandlerFunction | undefined = undefined;

    public url: string = "unknown";
    public method: "GET" | "POST" = "GET";
    public queriesDefine: RequestQueries = {};
    public requireApiKey: boolean = false;
    public mustBeBalancer: boolean = false;
    public processPower: number = 0;

    // Internal handlers
    private async _checkForApiKeyHeader(Request: any): Promise<boolean> {
        let receivedApiKey: string | undefined = Request.headers["x-api-key"];
        if (receivedApiKey) {
            if (this._frontend) {
                return await this._frontend.ServerBackend.Backend.IsValidApiKey(receivedApiKey);
            } else {
                // No backend to check, always true
                return true;
            }
        }

        return false;
    }
    private _createQueriesFromInfo(Request: any): any {
        let createdQueries: RequestQueries = {};
        let receivedQueries: RequestQueries = Request.query;

        Object.keys(this.queriesDefine).forEach((queryName: string) => {
            const paramType = this.queriesDefine[queryName];
            let newParamValue = undefined;
            let receivedParamValue = receivedQueries[queryName];
            if (!receivedParamValue) {
                return;
            }

            if (paramType == "string") {
                newParamValue = receivedParamValue.toString();
            } else if (paramType == "int") {
                newParamValue = (receivedParamValue.toString());
            }

            if (newParamValue) {
                createdQueries[queryName] = newParamValue;
            }
        });

        return createdQueries;
    }

    private async _handler(Request: any, Response: any) {
        if (!this._handlerFunction) {
            return;
        }
        if (this.requireApiKey) {
            if (!(await this._checkForApiKeyHeader(Request))) {
                let responseObject: ResponseDefiner =
                    new ResponseDefiner()
                        .code(HTTP_CODES.AUTH_ERROR)
                        .specificError(COMMON_SERVER_ERRORS.API_KEY_ERROR)
                        .message("Invalid API key.")
                return Response.status(responseObject.httpResponseCode).send(responseObject.serialize());
            }
        }
        let queries = this._createQueriesFromInfo(Request);

        // Query validation
        const queriesDefineKeys = Object.keys(this.queriesDefine);
        for (let i = 0; i < queriesDefineKeys.length; i++) {
            let queryName: string = queriesDefineKeys[i];
            let queryType: string = this.queriesDefine[queryName];

            if (!queries[queryName]) {
                let responseObject: ResponseDefiner =
                    new ResponseDefiner()
                        .code(HTTP_CODES.BAD_REQUEST)
                        .specificError(COMMON_SERVER_ERRORS.INVALID_QUERY)
                        .message(`Query "${queryName}" must exist and be of type "${queryType}".`)
                return Response.status(responseObject.httpResponseCode).send(responseObject.serialize());
            }
        }

        let responseObject: ResponseDefiner = this._handlerFunction.constructor.name === "AsyncFunction" ? await (this._handlerFunction(queries) as Promise<ResponseDefiner>) : this._handlerFunction(queries) as ResponseDefiner;
        Response.status(responseObject.httpResponseCode).send(responseObject.serialize());
    }

    // Setters
    public attachServerFrontend(frontend: ServerFrontendV2) {
        this._frontend = frontend;
        return this;
    }
    public usingUrl(url: string) {
        this.url = url;
        return this;
    }
    public requestMethod(method: "GET" | "POST") {
        this.method = method;
        return this;
    }
    public setQuery(queriesInfo: RequestQueries) {
        this.queriesDefine = queriesInfo;
        return this;
    }
    public needApiKey(need: boolean) {
        this.requireApiKey = true;
        return this;
    }
    public balancerOnly(balancerOnly: boolean) {
        this.mustBeBalancer = balancerOnly;
        return this;
    }
    public requireProcessPower(power: number) {
        this.processPower = power;
        return this;
    }

    // Main handler
    public on(handlerFunction: RequestHandlerFunction | RequestAsyncHandlerFunction) {
        if (!this._frontend) {
            return Warn(`${this.url} does not have a server frontend attached to!`)
        }

        this._handlerFunction = handlerFunction;
        this._frontend._worker.bind(
            this.url,
            // if passed the function, "this" context will be gone
            // hence we create a new function
            (...args: [any, any]) => this._handler.apply(this, args),
            this.method,
            this.mustBeBalancer,
            this.processPower
        );
    }
}

class ResponseDefiner {
    public httpResponseCode: number = HTTP_CODES.OK;
    public responseMessage: string | undefined = undefined
    public error: string | undefined = undefined;
    public data: {[name: string]: any} | undefined = undefined;

    // Setters
    public code(code: number) {
        this.httpResponseCode = code;
        return this;
    }
    public message(message: string | undefined) {
        this.responseMessage = message;
        return this;
    }
    public specificError(error: string | undefined) {
        this.error = error;
        return this;
    }
    public addData(dataName: string, dataValue: any) {
        if (!this.data) {
            this.data = {};
        }
        this.data[dataName] = dataValue;
        return this;
    }

    // Main thingy
    public serialize() {
        return {
            errorMessage: this.error,
            message: this.responseMessage,
            data: this.data
        }
    }
}

class ServerFrontendV2 {
    public _worker: Balancer | Worker;
    public ServerBackend: ServerBackendV2;

    constructor(ServerBackend: any, WorkerProcessor: Balancer | Worker) {
        this._worker = WorkerProcessor;
        this.ServerBackend = ServerBackend;

        Log("ServerFrontendV2 initialized");

        // GET requests

        // POST requests
        new RequestDefiner()
            .attachServerFrontend(this)
            .usingUrl("/api/v2/whitelist")
            .requestMethod("POST")
            .setQuery({
                assetId: "int",
                userId: "int"
            })
            .needApiKey(true)
            .balancerOnly(true)
            .on(async (queries: RequestQueries) => {
                let [success, errorCode, message] = await this.ServerBackend.WhitelistAsset(queries.assetId, queries.userId);
                return new ResponseDefiner()
                    .code(success ? HTTP_CODES.OK : HTTP_CODES.BAD_REQUEST)
                    .specificError(errorCode)
                    .message(message)
            });

        new RequestDefiner()
            .attachServerFrontend(this)
            .usingUrl("/api/v2/player/ban")
            .requestMethod("POST")
            .setQuery({
                userId: "int",
                banDuration: "int",
                reason: "string",
                moderator: "string"
            })
            .needApiKey(true)
            .on(async (queries: RequestQueries) => {
                if (queries.banDuration != 1 && queries.banDuration < 0) {
                    return new ResponseDefiner()
                        .code(HTTP_CODES.BAD_REQUEST)
                        .specificError(COMMON_SERVER_ERRORS.INVALID_QUERY)
                        .message("Ban duration cannot be negative. (Can be set to -1 for infinite duration.)")
                }

                let [banSuccess, removeLeaderboardSuccess, errorMessage] = await this.ServerBackend.BanPlayer(queries.userId, queries.banDuration, queries.reason, queries.moderator);
                
                return new ResponseDefiner()
                    .code(banSuccess ? HTTP_CODES.OK : HTTP_CODES.INTERNAL_SERVER_ERROR)
                    .specificError(!banSuccess ? COMMON_SERVER_ERRORS.INTERNAL_SERVER_ERROR : undefined)
                    .message(errorMessage != undefined ? `Failed to ban: ${errorMessage}` : undefined)
                    .addData("banned", banSuccess)
                    .addData("removedFromLeaderboard", removeLeaderboardSuccess)
            });

        new RequestDefiner()
            .attachServerFrontend(this)
            .usingUrl("/api/v2/player/unban")
            .requestMethod("POST")
            .setQuery({
                userId: "int"
            })
            .needApiKey(true)
            .on(async (queries: RequestQueries) => {
                let [unbanSuccess, errorMessage] = await this.ServerBackend.BanPlayer(queries.userId, queries.banDuration, queries.reason, queries.moderator);
                
                return new ResponseDefiner()
                    .code(unbanSuccess ? HTTP_CODES.OK : HTTP_CODES.INTERNAL_SERVER_ERROR)
                    .specificError(!unbanSuccess ? COMMON_SERVER_ERRORS.INTERNAL_SERVER_ERROR : undefined)
                    .message(errorMessage != undefined ? `Failed to unban: ${errorMessage}` : undefined)
                    .addData("unbanned", unbanSuccess)
            });
    }
}

export {ServerFrontendV2}