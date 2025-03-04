import Backend from "./Backend";
import { DiscordBot } from "./DiscordBot";
import { Balancer, Worker } from "./WorkerManager"
import {Log} from "../Utilities/Logger";

class LegacyServerFrontend {
    private _backend: Backend;
    private _discordBot: DiscordBot | undefined;
    private _worker: Balancer | Worker;

    constructor(Backend: Backend, WorkerProcessor: Balancer | Worker, DiscordBot: DiscordBot | undefined) {
        this._backend = Backend;
        this._worker = WorkerProcessor;
        this._discordBot = DiscordBot;

        Log("LegacyServerFrontend initialize");

        this._worker.bind('/whitelist', async (Request: any, Response: any) => {
            const RequestQuery = Request.query;
            let AssetId: number = RequestQuery.assetId ? parseInt(RequestQuery.assetId.toString()) : NaN;
            let UserId: number = RequestQuery.userId ? parseInt(RequestQuery.userId.toString()) : NaN;
            let ApiKey: string = RequestQuery.apiKey ? RequestQuery.apiKey.toString() : "NULL";

            if (isNaN(AssetId)) {
                Response.status(400).send("Invalid assetId param.")
				return;
			}
            if (isNaN(UserId)) {
				Response.status(400).send("Invalid userId param.")
				return;
            }
            if (ApiKey == "NULL" || !(await this._backend.IsValidApiKey(ApiKey))) {
				Response.status(400).send("Invalid apiKey param or API key has been invalidated.")
				return;
            }

            let backendResponse = await this._backend.WhitelistAsset(AssetId, UserId);
            if (this._discordBot) {
                if (backendResponse.code == this._backend.OutputCodes.OPERATION_SUCCESS || backendResponse.code == this._backend.OutputCodes.ALREADY_WHITELISTED)
                    this._discordBot.LogWhitelist(null, UserId.toString(), AssetId, true, backendResponse.message)
                else
                    this._discordBot.LogWhitelist(null, UserId.toString(), AssetId, false, `Code: ${this._backend.LookupNameByOutputCode(backendResponse.code)}\n${backendResponse.message}`)
            }

            Response.send(backendResponse);
        }, "GET", true);
        this._worker.bind('/scanmap', async (Request: any, Response: any) => {
            const RequestQuery = Request.query;
            let AssetId: number = RequestQuery.assetId ? parseInt(RequestQuery.assetId.toString()) : NaN;
            let ApiKey: string = RequestQuery.apiKey ? RequestQuery.apiKey.toString() : "NULL";

            if (isNaN(AssetId)) {
                Response.status(400).send("Invalid assetId param.")
				return;
			}
            if (ApiKey == "NULL" || !(await this._backend.IsValidApiKey(ApiKey))) {
				Response.status(400).send("Invalid apiKey param or API key has been invalidated.")
				return;
            }

            let backendReponse = await this._backend.ScanForMaliciousScripts(AssetId);
            Response.send(backendReponse);
        }, "GET", false, 23)
        this._worker.bind('/getshareableid', (Request: any, Response: any) => {
            const RequestQuery = Request.query;
            let AssetId: number = RequestQuery.assetId ? parseInt(RequestQuery.assetId.toString()) : NaN;

            if (isNaN(AssetId)) {
                Response.status(400).send("Invalid assetId param.")
				return;
			}

            Response.send(this._backend.IDConverter.Short(AssetId.toString()));
        }, "GET");
        this._worker.bind('/getnumberid', async (Request: any, Response: any) => {
            const RequestQuery = Request.query;
            let AssetId: string | undefined = RequestQuery.assetId ? RequestQuery.assetId.toString() : undefined;
            let ApiKey: string = RequestQuery.apiKey ? RequestQuery.apiKey.toString() : "NULL";

            if (AssetId == undefined) {
                Response.status(400).send("Invalid assetId param.")
				return;
			}
            if (ApiKey == "NULL" || !(await this._backend.IsValidApiKey(ApiKey))) {
				Response.status(400).send("Invalid apiKey param or API key has been invalidated.")
				return;
            }

            Response.send(this._backend.IDConverter.Number(AssetId.toString()));
        }, "GET");
        this._worker.bind('/queryscriptfilter', async (Request: any, Response: any) => {
            const RequestQuery = Request.query;
            let ApiKey: string = RequestQuery.apiKey ? RequestQuery.apiKey.toString() : "NULL";

            if (ApiKey == "NULL" || !(await this._backend.IsValidApiKey(ApiKey))) {
				Response.status(400).send("Invalid apiKey param or API key has been invalidated.")
				return;
            }

            Response.send(JSON.stringify(this._backend.ScriptsFilterList.roblox));
        }, "GET", true);
        this._worker.bind('/querybypassscan', async (Request: any, Response: any) => {
            const RequestQuery = Request.query;
            let ApiKey: string = RequestQuery.apiKey ? RequestQuery.apiKey.toString() : "NULL";

            if (ApiKey == "NULL" || !(await this._backend.IsValidApiKey(ApiKey))) {
				Response.status(400).send("Invalid apiKey param or API key has been invalidated.")
				return;
            }

            Response.send(JSON.stringify(this._backend.GetBypassScanIds()));
        }, "GET", true);

         this._worker.bind('/internal/getplacefile', async (Request: any, Response: any) => {
            const RequestQuery = Request.query;
            let PlaceId: number = RequestQuery.placeId ? parseInt(RequestQuery.placeId.toString()) : NaN
            let ApiKey: string = RequestQuery.apiKey ? RequestQuery.apiKey.toString() : "NULL";

            if (isNaN(PlaceId)) {
                Response.status(400).send("Invalid placeId param.")
				return;
			}
            if (ApiKey == "NULL" || !(await this._backend.IsValidApiKey(ApiKey))) {
				Response.status(400).send("Invalid apiKey param or API key has been invalidated.")
				return;
            }

            this._backend.Internal_GetPlaceFile(PlaceId, Response);
        }, "GET", true);

	    this._worker.bind('/internal/getmodelbinary', async (Request: any, Response: any) => {
            const RequestQuery = Request.query;
            let AssetId: number = RequestQuery.assetId ? parseInt(RequestQuery.assetId.toString()) : NaN
            let ApiKey: string = RequestQuery.apiKey ? RequestQuery.apiKey.toString() : "NULL";

            if (isNaN(AssetId)) {
                Response.status(400).send("Invalid assetId param.")
				return;
			}
            if (ApiKey == "NULL" || !(await this._backend.IsValidApiKey(ApiKey))) {
				Response.status(400).send("Invalid apiKey param or API key has been invalidated.")
				return;
            }

            this._backend.Internal_GetModelBinary(AssetId, Response);
        }, "GET", true);

        this._worker.bind('/restartbot', async (Request: any, Response: any) => {
            const RequestQuery = Request.query;
            let ApiKey: string = RequestQuery.apiKey ? RequestQuery.apiKey.toString() : "NULL";

            if (ApiKey == "NULL" || !(await this._backend.IsValidApiKey(ApiKey))) {
				Response.status(400).send("Invalid apiKey param or API key has been invalidated.")
				return;
            }
            if (this._discordBot && !this._discordBot.Alive)
                this._discordBot.start();
            Response.send("Request sent to bot.")
        }, "GET", true);

        this._worker.bind('/getsoundfrequencydata', async (Request: any, Response: any) => {
            const RequestQuery = Request.query;
            let AudioId: number = RequestQuery.audioId ? parseInt(RequestQuery.audioId.toString()) : NaN;
            let Compress: boolean = RequestQuery.compress ? RequestQuery.compress.toString() == "true" : false;

            if (isNaN(AudioId)) {
                Response.status(400).send("Invalid audioId param.")
				return;
			}

            Response.send(await this._backend.GetSoundFrequenciesData(AudioId, Compress));
        }, "GET", false, 20);

        this._worker.bind('/player/isbanned', async (Request: any, Response: any) => {
            const RequestQuery = Request.query;
            let UserId: number = RequestQuery.userId ? parseInt(RequestQuery.userId.toString()) : NaN;
            if (isNaN(UserId)) {
                Response.status(400).send("Invalid userId param.")
				return;
			}

            Response.send(await this._backend.IsPlayerBanned(UserId));
        }, "GET", false);

        this._worker.bind('/player/getbandata', async (Request: any, Response: any) => {
            const RequestQuery = Request.query;
            let UserId: number = RequestQuery.userId ? parseInt(RequestQuery.userId.toString()) : NaN;
            if (isNaN(UserId)) {
                Response.status(400).send("Invalid userId param.")
				return;
			}

            Response.send(await this._backend.GetPlayerBannedData(UserId) || null);
        }, "GET", false);

        this._worker.bind('/player/getbanlist', async (Request: any, Response: any) => {
            Response.send(await this._backend.GetBanList() || []);
        }, "GET", false);

        this._worker.bind('/player/ban', async (Request: any, Response: any) => {
            const RequestQuery = Request.query;
            let UserId: number = RequestQuery.userId ? parseInt(RequestQuery.userId.toString()) : NaN;
            let BanDuration: number = RequestQuery.duration ? parseInt(RequestQuery.duration.toString()) : NaN;
            let BanReason: string = RequestQuery.reason ? RequestQuery.reason.toString() : "NULL";
            let Moderator: string = RequestQuery.moderator ? RequestQuery.moderator.toString() : "NULL";
            let ApiKey: string = RequestQuery.apiKey ? RequestQuery.apiKey.toString() : "NULL";

            if (isNaN(UserId)) {
                Response.status(400).send("Invalid userId param.")
				return;
			}
            if (isNaN(BanDuration)) {
                Response.status(400).send("Invalid duration param.")
				return;
			}
            if (BanDuration != -1 && BanDuration < 0) {
                Response.status(400).send("duration param cannot be negative (unless if it's -1, which will ban indefinitely).")
				return;
            }
            if (BanReason == "NULL") {
                Response.status(400).send("Invalid reason param.")
				return;
			}
            if (Moderator == "NULL") {
                Response.status(400).send("Invalid moderator param.")
				return;
			}
            if (ApiKey == "NULL" || !(await this._backend.IsValidApiKey(ApiKey))) {
				Response.status(400).send("Invalid apiKey param or API key has been invalidated.")
				return;
            }

            await this._backend.BanPlayer("API", UserId, BanDuration, Moderator, BanReason);
            await this._backend.RemovePlayerFromLeaderboard(UserId);
            Response.send("Banned");
        }, "GET", false);
        
        this._worker.bind('/player/unban', async (Request: any, Response: any) => {
            const RequestQuery = Request.query;
            let UserId: number = RequestQuery.userId ? parseInt(RequestQuery.userId.toString()) : NaN;
            let ApiKey: string = RequestQuery.apiKey ? RequestQuery.apiKey.toString() : "NULL";

            if (isNaN(UserId)) {
                Response.status(400).send("Invalid userId param.")
				return;
			}
            if (ApiKey == "NULL" || !(await this._backend.IsValidApiKey(ApiKey))) {
				Response.status(400).send("Invalid apiKey param or API key has been invalidated.")
				return;
            }

            await this._backend.UnbanPlayer(UserId);
            Response.send("Unbanned");
        }, "GET", false);
    }
}

export default LegacyServerFrontend;
