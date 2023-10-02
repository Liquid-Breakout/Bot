// The Backend process all requests from Frontend.
// Meant to be attached to a Frontend.

import Backend from "./Backend";
import { DiscordBot } from "./DiscordBot";

class ServerBackendV2 {
    public Backend: Backend;
    public DiscordBotClient: DiscordBot | undefined;

    constructor(Backend: Backend, DiscordBotClient: DiscordBot | undefined) {
        this.Backend = Backend;
        this.DiscordBotClient = DiscordBotClient;
    }

    public async WhitelistAsset(assetId: number, userRequesting: number): Promise<[boolean, string | undefined, string]> {
        // The backend function uses V1 output, we need to transform it.
        let result = await this.Backend.WhitelistAsset(assetId, userRequesting);
        if (result.code == this.Backend.OutputCodes.ALREADY_WHITELISTED) {
            return [true, undefined, "Asset is already whitelisted."]
        } else if (result.code != this.Backend.OutputCodes.OPERATION_SUCCESS) {
            return [false, this.Backend.LookupNameByOutputCode(result.code), result.message]
        }
        return [true, undefined, "Successfully whitelisted asset."]
    }

    public async BanPlayer(userId: number, banDuration: number, reason: string, moderator: string): Promise<[boolean, boolean, string | undefined]> {
        let banSuccess = false;
        let removeLeaderboardSuccess = false;
        let errorMessage: string | undefined = undefined;
        
        try {
            await this.Backend.BanPlayer("API", userId, banDuration, moderator, reason);
            banSuccess = true;
            const [removedFromLeaderboard, foundInLeaderboard] = await this.Backend.RemovePlayerFromLeaderboard(userId);
            if (!removedFromLeaderboard) {
                errorMessage = "Cannot remove from leaderboard(s)."
            } else if (!foundInLeaderboard) {
                errorMessage = "Player not found in leaderboard(s)."
            } else {
                removeLeaderboardSuccess = true;
            }
        } catch (err: any) {
            errorMessage = err;
        }

        return [banSuccess, removeLeaderboardSuccess, errorMessage];
    }

    public async UnbanPlayer(userId: number): Promise<[boolean, string | undefined]> {
        let unbanSuccess = false;
        let errorMessage = undefined;

        try {
            await this.Backend.UnbanPlayer(userId);
            unbanSuccess = true;
        } catch (err: any) {
            errorMessage = err;
        }

        return [unbanSuccess, errorMessage];
    }
}

export {ServerBackendV2};