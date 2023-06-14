import axios from "axios";
import { Response } from "express";
import mongoose from "mongoose";
//import decodeAudio from "audio-decode"
//import { decode } from "punycode";

function reverseString(inputStr: string): string {
    let strArray: Array<string> = inputStr.split(" ");
    let reversedStrArray: Array<string> = strArray.map((word) => {
        let charArray: Array<string> = word.split("");
        charArray.reverse();

        let reversed: string = charArray.join("");
        return reversed;
    }).reverse();

    let reversedStr: string = reversedStrArray.join(" ");
    return reversedStr;
}

class IDConverterClass {
    private _alphabets: {"alphabet": string, "decimals": string}
    
    private convert(inputStr: string, translation: string, newTranslation: string, shift: boolean): string {
        let x: number = 0;
        let baseValue: number = translation.length;
    
        for (let i = 0; i < inputStr.length; i++) {
            const digit: string = inputStr[i];
            let digitIndex: number = translation.indexOf(digit) + 1;
            digitIndex -= shift ? 1 : 0
    
            x = x * baseValue + digitIndex
        }
    
        if (x != 0) {
            let result: string = "";
            const newBaseVal = newTranslation.length;
    
            while (x > 0) {
                let digitVal: number = x % newBaseVal;
                digitVal -= shift ? 1 : 0;
                let appendNew = digitVal == -1 ? "0" : newTranslation[digitVal];
    
                if (appendNew == undefined)
                    return shift ? reverseString(`ID Error: ${digitVal} index is out of range`) : `ID Error: ${digitVal} index is out of range`;
    
                result = `${appendNew}${result}`;
                x = Math.floor(x / newBaseVal);
            }
    
            return result;
        } else return newTranslation[0]
    }
    public Short(inputStr: string): string {
        return reverseString(this.convert(inputStr, this._alphabets.decimals, this._alphabets.alphabet, true));
    }
    public Number(inputStr: string): string {
        return this.convert(reverseString(inputStr), this._alphabets.alphabet, this._alphabets.decimals, false);
    }

    constructor(alphabet: string, decimals: string) {
        this._alphabets = {
            "alphabet": alphabet,
            "decimals": decimals
        }
    }
}

// Schemas
const ApiKeySchema = new mongoose.Schema({
    value: String,
    assignOwner: String,
    associatedDiscordUser: String,
    enabled: Boolean,
    timeCreated: Number,
});

// Models
const ApiKeyModel = mongoose.model("apiKey", ApiKeySchema);

function CreateOutput(Code: number, Message?: string | null, Data?: any) {
    return {"code": Code, "message": Message, data: Data};
}

class Backend {
    private _privilegeKeyGenerator: IDConverterClass;

    public IDConverter: IDConverterClass;
    public RobloxToken: string;
    public OutputCodes: {[index: string]: number} = {
        "OPERATION_SUCCESS": 0,
        "ALREADY_WHITELISTED": 1,
        "ERR_CANNOT_WHITELIST": 3,
        "ERR_NO_SESSION_TOKEN": 4, // Require a cookie change immediately
        "ERR_ITEM_NOT_OWNED_BY_USER": 5,
        "ERR_INVALID_ITEM": 6,
        "ERR_INVALID_API_KEY": 7,
        "ERR_INVALID_API_KEY_OWNER": 8
    };

    public LookupNameByOutputCode(Code: number) {
        return Object.keys(this.OutputCodes).find(key => this.OutputCodes[key] === Code) || "ERR_UNKNOWN";
    }

    public async CheckIfUserOwnItem(AssetId: number, UserId: number) {
        try {
            return (await axios(`https://inventory.roblox.com/v1/users/${UserId}/items/Asset/${AssetId}/is-owned`)).data
        } catch(_) {
            return false;
        }
    }
    public async WhitelistAsset(AssetId: number, UserId: number) {
        const CreatorOwnedItem = await this.CheckIfUserOwnItem(AssetId, 138801491);
        if (CreatorOwnedItem)
            return CreateOutput(this.OutputCodes.ALREADY_WHITELISTED);

        if (!Number.isNaN(UserId)) {
            const OwnItem: boolean = await this.CheckIfUserOwnItem(AssetId, UserId);
            if (!OwnItem)
            return CreateOutput(
                this.OutputCodes.ERR_ITEM_NOT_OWNED_BY_USER,
                `Cannot whitelist: ${AssetId} is not owned by requested user.`
            );
        }

        let SessionToken: string | undefined = undefined;
        try {
            await axios({
                url: "https://auth.roblox.com/v2/logout",
                method: "POST",
                headers: {
                    cookie: `.ROBLOSECURITY=${this.RobloxToken}`,
                },
            });
        } catch (AxiosResponse: any) {
            SessionToken = AxiosResponse.response.headers["x-csrf-token"];
        }
        if (SessionToken == undefined)
            return CreateOutput(
                this.OutputCodes.ERR_NO_SESSION_TOKEN,
                "Cannot whitelist: Failed to obtain session token.\nContact the developer."
            );
        
        let ItemData, ErrorResponse;
        try {
            ItemData = (await axios({
                url: `https://economy.roblox.com/v2/assets/${AssetId}/details`,
                method: "GET",
            })).data;
        } catch (AxiosResponse: any) { ErrorResponse = AxiosResponse; }
        if (!ItemData)
            return CreateOutput(
                this.OutputCodes.ERR_INVALID_ITEM,
                `Cannot whitelist: Failed to obtain item data.`,
                {
                    "robloxErrorCode": ErrorResponse.response != null ? ErrorResponse.response.status : -1,
                    "robloxMessage": ErrorResponse.response != null ? ErrorResponse.response.statusText : null,
                }
            );
        
        const ProductId = ItemData.ProductId;
        const AssetType = ItemData.AssetTypeId;
        const IsOnSale = ItemData.IsPublicDomain;
        const ItemPrice = parseInt(ItemData.PriceInRobux);
    
        if (!IsOnSale)
            return CreateOutput(
                this.OutputCodes.ERR_INVALID_ITEM,
                `Cannot whitelist: Item is not on-sale.`
            );
        else if (AssetType != 10)
            return CreateOutput(
                this.OutputCodes.ERR_INVALID_ITEM,
                `Cannot whitelist: Item type is not a Model`
            );
        else if (!isNaN(ItemPrice) && ItemPrice > 0)
            return CreateOutput(
                this.OutputCodes.ERR_INVALID_ITEM,
                `Cannot whitelist: Item costs Robux.`
            );
        else {
            try {
                await axios({
                    url: `https://economy.roblox.com/v1/purchases/products/${ProductId}`,
                    method: "POST",
                    headers: {
                        cookie: `.ROBLOSECURITY=${this.RobloxToken}`,
                        "x-csrf-token": SessionToken,
                    },
                    data: {
                        expectedCurrency: 1,
                        expectedPrice: 0,
                    },
                });
                return CreateOutput(
                    this.OutputCodes.OPERATION_SUCCESS,
                    null,
                    {"shareableId": this.IDConverter.Short(AssetId.toString())}
                );
            } catch (AxiosResponse: any) {
                return CreateOutput(
                    this.OutputCodes.ERR_CANNOT_WHITELIST,
                    null,
                    {
                        "robloxErrorCode": AxiosResponse.response != null ? AxiosResponse.response.status : -1,
                        "robloxMessage": AxiosResponse.response != null ? AxiosResponse.response.statusText : null,
                    }
                )
            }
        }
    }    

    public async Internal_GetPlaceFile(PlaceId: number, ExpressResponse: Response) {
        try {
            const AxiosResponse = await axios({
                url: `https://assetdelivery.roblox.com/v1/asset/?id=${PlaceId}`,
                method: "GET",
                responseType: "stream",
                headers: {
                    cookie: `.ROBLOSECURITY=${this.RobloxToken}` 
                }
            });
            AxiosResponse.data.pipe(ExpressResponse);
        } catch (AxiosResponse: any) {
            ExpressResponse.sendStatus(400);
        }
    }

    public async IsValidApiKey(apiKey: string) {
        const document = await ApiKeyModel.findOne({ value: apiKey }).exec();
        if (document == null)
            return false;
        if (!document.enabled)
            return false;
        return true
    } 

    public async UserAlreadyHaveApiKey(user: string) {
        const foundDocument = await ApiKeyModel.findOne({$or: [
            { assignOwner: user },
            { associatedDiscordUser: user }
        ]}).exec();
        return foundDocument != null;
    }

    public async GenerateApiKey() {
        const documentCount = await ApiKeyModel.countDocuments().exec();
        return this._privilegeKeyGenerator.Short((documentCount * 8 + Date.now() * 2).toString());
    }

    public async CreateApiKeyEntry() {
        const newDocument = new ApiKeyModel({ value: await this.GenerateApiKey(), timeCreated: Date.now(), enabled: true });
        await newDocument.save();
        return newDocument.value;
    }

    public async SetApiKeyEntryValue(method: string, searchValue: string, valueName: string, value: string | boolean) {
        if (method == "byKey") {
            if (!(await this.IsValidApiKey(searchValue)))
                return CreateOutput(
                    this.OutputCodes.ERR_INVALID_API_KEY,
                    "API key do not exist or already disabled."
                )
            const document = await ApiKeyModel.findOne({ value: searchValue }).exec();
            await document!.updateOne({ [valueName]: value });
            
            return CreateOutput(this.OutputCodes.OPERATION_SUCCESS);
        } else if (method == "byOwner") {
            if (!(await this.UserAlreadyHaveApiKey(searchValue)))
                return CreateOutput(
                    this.OutputCodes.ERR_INVALID_API_KEY_OWNER,
                    "The specified user do not have API key."
                )
            const documents = await ApiKeyModel.find({$or: [
                { assignOwner: searchValue },
                { associatedDiscordUser: searchValue }
            ]}).exec();

            documents.forEach(async (document) => await document!.updateOne({ [valueName]: value }));

            return CreateOutput(this.OutputCodes.OPERATION_SUCCESS);
        }

        return CreateOutput(this.OutputCodes.OPERATION_SUCCESS); // lol dont ask why
    }

    public async GetApiKeysFromUser(User: string) {
        const documents = await ApiKeyModel.find({$or: [
            { assignOwner: User },
            { associatedDiscordUser: User }
        ]});
        return documents;
    }

    /*public async GetSoundFrequenciesData(SoundId: number) {
        let SessionToken: string | undefined = undefined;
        try {
            await axios({
                url: "https://auth.roblox.com/v2/logout",
                method: "POST",
                headers: {
                    cookie: `.ROBLOSECURITY=${this.RobloxToken}`,
                },
            });
        } catch (AxiosResponse: any) {
            SessionToken = AxiosResponse.response.headers["x-csrf-token"];
        }
        if (SessionToken == undefined)
            return CreateOutput(
                this.OutputCodes.ERR_NO_SESSION_TOKEN,
                "Cannot get sound data: Failed to obtain session token.\nContact the developer."
            );
        
        let AssetData, ErrorResponse;
        try {
            AssetData = (await axios({
                url: `https://assetdelivery.roblox.com/v1/assets/batch`,
                method: "POST",
                headers: {
                    cookie: `.ROBLOSECURITY=${this.RobloxToken}` 
                },
                data: [{
                    requestId: 0,
                    assetId: SoundId
                }]
            })).data;
        } catch (AxiosResponse: any) { ErrorResponse = AxiosResponse; }
        if (!AssetData)
            return CreateOutput(
                this.OutputCodes.ERR_INVALID_ITEM,
                `Cannot get sound data: Failed to obtain item data.`,
                {
                    "robloxErrorCode": ErrorResponse.response != null ? ErrorResponse.response.status : -1,
                    "robloxMessage": ErrorResponse.response != null ? ErrorResponse.response.statusText : null,
                }
            );
        
        const audioUrl: string | undefined = AssetData[0]["location"];
        if (!audioUrl) return []; // because im just testing, no handles
        const initialAudioBuffer: ArrayBuffer = (await axios.get(audioUrl, {responseType: "arraybuffer"})).data;
        const audioBuffer: Buffer = Buffer.from(initialAudioBuffer);
        const decodedData = await decodeAudio(audioBuffer);
    }*/

    constructor(SetRobloxToken?: string, MongoDbUrl?: string) {
        if (SetRobloxToken == undefined)
            throw new Error("Backend: No Roblox Token was supplied.")
        if (MongoDbUrl == undefined)
            throw new Error("Backend: No MongoDB uri was supplied.")

        this.IDConverter = new IDConverterClass(
            "123456789*=+-aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",
            "0123456789"
        );
        this._privilegeKeyGenerator = new IDConverterClass(
            "qwertyuiopasdfghjklzxcvbnm0192837465",
            "5432189076"
        )
        this.RobloxToken = SetRobloxToken;
        mongoose.connect(MongoDbUrl);

        console.log("Backend initialize");
    }
}
export default Backend;