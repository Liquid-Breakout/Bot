import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import Backend from "./Backend";
import ServerFrontend from "./ServerFrontend";
import DiscordBot from "./DiscordBot";

if (fs.existsSync(path.resolve(__dirname, "../dev_config/.env"))) {
	dotenv.config({ path: path.resolve(__dirname, "../dev_config/.env") });
}

const RobloxToken: string | undefined = process.env["LBCookie"];
const BotToken: string | undefined = process.env["BotToken"];
const MongoDBUri: string | undefined = process.env["MongoDBUri"];

const TheBackend = new Backend(RobloxToken, MongoDBUri);
const Bot = new DiscordBot(TheBackend, ";", BotToken);
new ServerFrontend(TheBackend, Bot);
Bot.start();