import express, { Express, Request, Response } from "express";
import compression from "compression";
import Backend from "./Backend";
import { DiscordBot } from "./DiscordBot";

class ServerFrontend {
    private _backend: Backend;
    private _discordBot: DiscordBot;
    public ServerApp: Express;

    constructor(Backend: Backend, DiscordBot: DiscordBot) {
        this._backend = Backend;
        this._discordBot = DiscordBot;

        console.log("ServerFrontend initialize");
        this.ServerApp = express();

        this.ServerApp.use(compression());
        this.ServerApp.get('/', (Request: Request, Response: Response) => {
            Response.send("API site for Liquid Breakout.\nCurrent APIs:\n-Whitelisting\n-ID Converter");
        });
        this.ServerApp.get('/whitelist', async (Request: Request, Response: Response) => {
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
            if (backendResponse.code == this._backend.OutputCodes.OPERATION_SUCCESS || backendResponse.code == this._backend.OutputCodes.ALREADY_WHITELISTED)
                this._discordBot.LogWhitelist(null, UserId.toString(), AssetId, true, backendResponse.message)
            else
                this._discordBot.LogWhitelist(null, UserId.toString(), AssetId, false, `Code: ${this._backend.LookupNameByOutputCode(backendResponse.code)}\n${backendResponse.message}`)

            Response.send(backendResponse);
        });
        this.ServerApp.get('/scanmap', async (Request: Request, Response: Response) => {
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
        })
        this.ServerApp.get('/getshareableid', (Request: Request, Response: Response) => {
            const RequestQuery = Request.query;
            let AssetId: number = RequestQuery.assetId ? parseInt(RequestQuery.assetId.toString()) : NaN;

            if (isNaN(AssetId)) {
                Response.status(400).send("Invalid assetId param.")
				return;
			}

            Response.send(this._backend.IDConverter.Short(AssetId.toString()));
        });
        this.ServerApp.get('/getnumberid', async (Request: Request, Response: Response) => {
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
        });
        this.ServerApp.get('/queryscriptfilter', async (Request: Request, Response: Response) => {
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

            Response.send(JSON.stringify(this._backend.ScriptsFilterList.roblox));
        });

        this.ServerApp.get('/internal/getplacefile', async (Request: Request, Response: Response) => {
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
        });

	    this.ServerApp.get('/internal/getmodelbinary', async (Request: Request, Response: Response) => {
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
        });

        this.ServerApp.get('/restartbot', async (Request: Request, Response: Response) => {
            const RequestQuery = Request.query;
            let ApiKey: string = RequestQuery.apiKey ? RequestQuery.apiKey.toString() : "NULL";

            if (ApiKey == "NULL" || !(await this._backend.IsValidApiKey(ApiKey))) {
				Response.status(400).send("Invalid apiKey param or API key has been invalidated.")
				return;
            }
            if (!this._discordBot.Alive)
                this._discordBot.start();
            Response.send("Request sent to bot.")
        });

        this.ServerApp.get('/getsoundfrequencydata', async (Request: Request, Response: Response) => {
            const RequestQuery = Request.query;
            let AudioId: number = RequestQuery.audioId ? parseInt(RequestQuery.audioId.toString()) : NaN;
            let Compress: boolean = RequestQuery.compress ? RequestQuery.compress.toString() == "true" : false;

            if (isNaN(AudioId)) {
                Response.status(400).send("Invalid audioId param.")
				return;
			}

            Response.send(await this._backend.GetSoundFrequenciesData(AudioId, Compress));
        });

        this.ServerApp.listen(8000, () => {
            console.log(`ServerFrontEnd: Ready for request`);
        });
    }
}

export default ServerFrontend;
