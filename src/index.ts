import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import Backend from "./Backend";
import ServerFrontend from "./ServerFrontend";
import {DiscordBot} from "./DiscordBot";
import {Balancer, Worker} from "./WorkerManager";
import {Log, SetWorkerStatus} from "./Logger";

// Test only
import cluster from "cluster";

if (fs.existsSync(path.join(__dirname, '../dev_config/.env'))) {
	dotenv.config({ path: path.join(__dirname, "../dev_config/.env") });
}

const RobloxToken: string | undefined = process.env["LBCookie"];
const RobloxAudioToken: string | undefined = process.env["AudioCookie"];
const BotToken: string | undefined = process.env["BotToken"];
const BotClientId: string | undefined = process.env["BotClientId"];
const MongoDBUri: string | undefined = process.env["MongoDBUri"];
const ServerType: string = process.env["ServerType"] || "WEAK";
const IsDevelopment: boolean = process.env["IsDevelopment"] == "1";
const IsBalancer: boolean = process.env["ProcessType"] == "BALANCER" || cluster.isPrimary;
const BalancerUrl: string = process.env["BalancerUrl"] || "localhost:8080"; // lol

const AppBackend = new Backend(RobloxToken, RobloxAudioToken, MongoDBUri, ServerType);
const WorkerProcessor = IsBalancer ? new Balancer(BalancerUrl) : new Worker(BalancerUrl);

SetWorkerStatus(!IsBalancer);
Log(`Launch parameter: Development: ${IsDevelopment}, Balancer: ${IsBalancer}`);
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
new ServerFrontend(AppBackend, WorkerProcessor, Bot);