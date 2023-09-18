import { consola } from "consola"

let IsWorker: boolean = false;

function transformText(text: string): string {
    return `${IsWorker ? "[WORKER]" : "[BALANCER]"}: ${text}`
}

function Log(text: string) {
    consola.info(transformText(text));
}
function Warn(text: string) {
    consola.warn(transformText(text));
}
function Throw(text: string) {
    consola.error(new Error(transformText(text)));
}

function SetWorkerStatus(status: boolean) {
    IsWorker = status;
}

export {Log, Warn, Throw, SetWorkerStatus}