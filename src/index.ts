import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { Guid } from "guid-typescript"

import Backend from "./Components/Backend";
import LegacyServerFrontend from "./Components/LegacyServerFrontend";
import { ServerBackendV2 } from "./Components/ServerBackend";
import { ServerFrontendV2 } from "./Components/ServerFrontend";
import {DiscordBot} from "./Components/DiscordBot";
import {Balancer, Worker} from "./Components/WorkerManager";
import {Log, SetWorkerStatus} from "./Utilities/Logger";

// Test only
import cluster from "cluster";

__dirname = path.dirname(module.filename || process.execPath); // nexe moment
if (fs.existsSync(path.join(__dirname, '../dev_config/.env'))) {
	dotenv.config({ path: path.join(__dirname, "../dev_config/.env") });
}

const RobloxToken: string | undefined = process.env["LBCookie"];
const RobloxApiKey: string | undefined = process.env["LBRobloxApiKey"];
const RobloxAudioToken: string | undefined = process.env["AudioCookie"];
const BotToken: string | undefined = process.env["BotToken"];
const BotClientId: string | undefined = process.env["BotClientId"];
const MongoDBUri: string | undefined = process.env["MongoDBUri"];
const ServerType: string = process.env["ServerType"] || "WEAK";
const IsDevelopment: boolean = process.env["IsDevelopment"] == "1";
const IsBalancer: boolean = process.env["ProcessType"] == "BALANCER" && cluster.isPrimary;
const BalancerUrl: string = IsDevelopment ? "localhost:8080" : (process.env["BalancerUrl"] || "localhost:8080");
const WorkerIdentifer: string = process.env["WorkerIdentifer"] || `${process.platform}-worker-${Guid.create().toString()}`;

SetWorkerStatus(!IsBalancer);
Log(`Launch parameter: Development: ${IsDevelopment}, Balancer: ${IsBalancer}`);
const AppBackend = new Backend(RobloxToken, RobloxApiKey, RobloxAudioToken, MongoDBUri, ServerType);
const WorkerProcessor = IsBalancer ? new Balancer(BalancerUrl) : new Worker(WorkerIdentifer, BalancerUrl);
WorkerProcessor.connect();

let Bot: DiscordBot | undefined;
if (cluster.isPrimary && IsBalancer) {
	Log("Balancer started.");
	Bot = new DiscordBot(AppBackend, ";", BotToken, BotClientId);
	Bot.start();
	if (IsDevelopment) {
		cluster.fork(); // Create new instance that acts as the worker.
	}
} else {
	Log(`Worker ${(WorkerProcessor instanceof Worker) ? WorkerProcessor._id : "unknown"} started.`);
}
new LegacyServerFrontend(AppBackend, WorkerProcessor, Bot);
new ServerFrontendV2(new ServerBackendV2(AppBackend, Bot), WorkerProcessor);