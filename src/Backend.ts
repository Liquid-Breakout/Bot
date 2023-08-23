import axios from "axios";
import { Response } from "express";
import mongoose from "mongoose";
import decodeAudio from "./audioDecoder/index"
import Meyda from "meyda";
import zlib from "node:zlib"
import { Log, Warn } from "./Logger";
import FileParser from "./RobloxFileParser/FileParser"
import { Instance } from "./RobloxFileParser/Instance";
import maxmind, { CountryResponse } from 'maxmind';
import { publicIpv4 } from "./public-ip";
import {GeoIpDbName, open} from "./geolite2-redist/dist/index"
import { URL } from "node:url";

// For your concern, this is used to check if we need to use a proxy server
// (As Roblox block IP address that mismatch cookie's continent :( )
const ASIA_PROXY_SERVERS = [
    {
        protocol: "https",
        host: "103.133.221.251",
        port: 80
    },
    {
        protocol: "https",
        host: "125.209.110.124",
        port: 8080,
    },
    {
        protocol: "https",
        host: "35.221.203.144",
        port: 3128
    }
];
let IP_ADDRESS = '0.0.0.0';
(async () => {
    IP_ADDRESS = await publicIpv4();
})();

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

async function getAvaliableProxy(): Promise<any> {
    let selectedProxy: any = undefined;
    for (let proxyInfo of ASIA_PROXY_SERVERS) {
        axios({
            url: "www.google.com",
            proxy: proxyInfo
        }).then((response) => {
            if (response && response.status == 200) {
                selectedProxy = proxyInfo;
            }
        })
        .catch(e => {});
    }
    await sleepUntil(() => selectedProxy != undefined, 5000);

    return selectedProxy;
}

async function axiosWithProxy(...args: any[]): Promise<any> {
    let isAsiaLocation = false;
    const reader = await open(
        GeoIpDbName.Country,
        (path: any) => maxmind.open<CountryResponse>(path)
    )
    const lookup = reader.get(IP_ADDRESS);
    if (lookup) {
        isAsiaLocation = lookup.continent?.code == "AS"
    }
    reader.close()
    if (!isAsiaLocation) {
        // Modify the arguments
        const usingProxy = await getAvaliableProxy();
        if (usingProxy) {
            if (typeof args[0] === "string" && args[1] !== undefined) {
                args[1].proxy = usingProxy;
            } else if (args[0] !== undefined) {
                args[0].proxy = usingProxy;
            }
        }
    }
    return (await axios(args[0], args[1]));
}

const ExternalFrequencyProcessorUrl = "https://externalsoundfrequencyprocessor.onrender.com";

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

function getLineColumnFromIndex(source: string, index: number): [number, number] {
    if (index == -1) {
        return [-1, -1];
    }

    const lines = source.split("\n");
    let totalIndex = 0;
    let lineStartIndex = 0;
    for (let line = 0; line < lines.length; line++) {
        totalIndex += lines[line].length + 1 // Because we removed the '\n' during split.
        if (index < totalIndex) {
            return [line + 1, index - lineStartIndex]
        }
        lineStartIndex = totalIndex
    }

    return [-1, -1];
}

class IDConverterClass {
    private _alphabets: {"alphabet": string, "decimals": string}
    
    private convert(inputStr: string, translation: string, newTranslation: string, shift: boolean): string {
        if (!inputStr || !translation || !newTranslation) {
            return "";
        }

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
const LeaderboardResetAnnounceSchema = new mongoose.Schema({
    month: Number,
    year: Number
})

// Models
const ApiKeyModel = mongoose.model("apiKey", ApiKeySchema);
const LeaderboardResetAnnounceModel = mongoose.model("leaderboardResetAnnounce", LeaderboardResetAnnounceSchema);

function CreateOutput(Code: number, Message?: string | null, Data?: any) {
    return {"code": Code, "message": Message, data: Data};
}

class Backend {
    private _privilegeKeyGenerator: IDConverterClass;

    public SelectedServerType: string
    public IDConverter: IDConverterClass;
    public RobloxToken: string;
    public RobloxApiKey: string;
    public RobloxAudioToken: string;
    public OutputCodes: {[index: string]: number} = {
        "OPERATION_SUCCESS": 0,
        "ALREADY_WHITELISTED": 1,
        "ERR_CANNOT_WHITELIST": 3,
        "ERR_NO_SESSION_TOKEN": 4, // Require a cookie change immediately
        "ERR_ITEM_NOT_OWNED_BY_USER": 5,
        "ERR_INVALID_ITEM": 6,
        "ERR_INVALID_API_KEY": 7,
        "ERR_INVALID_API_KEY_OWNER": 8,
        "ERR_CANNOT_PARSE_MODEL": 9,
        "SCAN_RESULT_MALICIOUS": 10,
        "SCAN_RESULT_CLEAN": 11
    };
    public ScriptsFilterList: {roblox: {[filterText: string]: {type: "function" | "string", report: string, exceptions?: string[]}}, server: {[filterText: string]: {type: "function" | "string", report: string, exceptions?: RegExp[]}}} = {
        roblox: {
            "loadasset": {type: "string", report: "Usage of :LoadAsset()"},
            "httpservice": {type: "string", report: "Attempted to use HttpService"},
            "loadstring": {type: "string", report: "Attempted to use loadstring"},
            "getfenv": {type: "string", report: "Extremely suspicious (usage of getfenv)"},
            "require": {type: "string", report: "Usage of require() id", exceptions: ["(%([%a%s%.%:%[%]%'%\"%(%)]+%))", "(%a*)"]}
        },
        server: {
            "loadasset": {type: "string", report: "Usage of :LoadAsset()"},
            "httpservice": {type: "string", report: "Attempted to use HttpService"},
            "loadstring": {type: "string", report: "Attempted to use loadstring"},
            "getfenv": {type: "string", report: "Extremely suspicious (usage of getfenv)"},
            "require": {type: "string", report: "Usage of require() id", exceptions: [/(\((?!\d)[\w \.\[\]\'\"]+\))+/]}
        }
    };

    public LookupNameByOutputCode(Code: number) {
        return Object.keys(this.OutputCodes).find(key => this.OutputCodes[key] === Code) || "ERR_UNKNOWN";
    }

    public async CheckIfUserOwnItem(AssetId: number, UserId: number) {
        try {
            return (await axiosWithProxy(`https://inventory.roblox.com/v1/users/${UserId}/items/Asset/${AssetId}/is-owned`)).data
        } catch(_) {
            return false;
        }
    }
    public async GetSessionToken(Cookie: string): Promise<[boolean, any]> {
        let SessionToken: string | undefined = undefined;
        let FetchError = "";
        try {
            await axiosWithProxy({
                url: "https://auth.roblox.com/v2/logout",
                method: "POST",
                headers: {
                    cookie: `.ROBLOSECURITY=${Cookie}`,
                },
            });
        } catch (AxiosResponse: any) {
            SessionToken = AxiosResponse.response ? AxiosResponse.response.headers["x-csrf-token"] : undefined;
            if (AxiosResponse && !AxiosResponse.response) {
                FetchError = AxiosResponse;
            }
        }
        if (SessionToken == undefined)
            return [false, CreateOutput(
                this.OutputCodes.ERR_NO_SESSION_TOKEN,
                `${FetchError != "" ? "An error occured while attempting to call Roblox's API." : "Failed to obtain session token.\nContact the developer."}\n${FetchError}`
            )];
        return [true, SessionToken];
    }
    public async WhitelistAsset(AssetId: number, UserId: number) {
        const CreatorOwnedItem = await this.CheckIfUserOwnItem(AssetId, 138801491);
        if (CreatorOwnedItem)
            return CreateOutput(this.OutputCodes.ALREADY_WHITELISTED, "User have already whitelisted ID.");

        if (!Number.isNaN(UserId)) {
            const OwnItem: boolean = await this.CheckIfUserOwnItem(AssetId, UserId);
            if (!OwnItem)
            return CreateOutput(
                this.OutputCodes.ERR_ITEM_NOT_OWNED_BY_USER,
                `Cannot whitelist: ${AssetId} is not owned by requested user.`
            );
        }

        let [FetchSessionSuccess, SessionToken] = await this.GetSessionToken(this.RobloxToken);
        if (!FetchSessionSuccess)
            return SessionToken

        let ItemData, ErrorResponse;
        try {
            ItemData = (await axiosWithProxy({
                url: `https://economy.roblox.com/v2/assets/${AssetId}/details`,
                method: "GET",
            })).data;
        } catch (AxiosResponse: any) { ErrorResponse = AxiosResponse; }
        if (!ItemData)
            return CreateOutput(
                this.OutputCodes.ERR_INVALID_ITEM,
                `Cannot whitelist: Failed to obtain item data.\n${ErrorResponse.response ? ErrorResponse.response.statusText : ErrorResponse}`,
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
                `Cannot whitelist: Item type is not a Model.`
            );
        else if (!isNaN(ItemPrice) && ItemPrice > 0)
            return CreateOutput(
                this.OutputCodes.ERR_INVALID_ITEM,
                `Cannot whitelist: Item costs Robux.`
            );
        else {
            if (this.SelectedServerType != "WEAK") {
                const scanResult = await this.ScanForMaliciousScripts(AssetId, true);
                if (scanResult.code == this.OutputCodes.SCAN_RESULT_MALICIOUS) {
                    return CreateOutput(
                        this.OutputCodes.ERR_CANNOT_WHITELIST,
                        "Failed to whitelist: Model contains potentional malicious scripts.",
                        {
                            scanResult: scanResult.data.scanResult
                        }
                    )
                }
            }
            try {
                await axiosWithProxy({
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
                    "User successfully whitelisted ID.",
                    {"shareableId": this.IDConverter.Short(AssetId.toString())}
                );
            } catch (AxiosResponse: any) {
                return CreateOutput(
                    this.OutputCodes.ERR_CANNOT_WHITELIST,
                    "Failed to whitelist: Cannot purchase model.",
                    {
                        "robloxErrorCode": AxiosResponse.response != null ? AxiosResponse.response.status : -1,
                        "robloxMessage": AxiosResponse.response != null ? AxiosResponse.response.statusText : null,
                    }
                )
            }
        }
    }    

    public async ScanForMaliciousScripts(AssetId: number, SkipOwnedCheck?: boolean) {
        if (!SkipOwnedCheck) {
            const CreatorOwnedItem = await this.CheckIfUserOwnItem(AssetId, 138801491);
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
                    `Cannot scan: Failed to obtain item data.\n${ErrorResponse.response ? ErrorResponse.response.statusText : ErrorResponse}`,
                    {
                        "robloxErrorCode": ErrorResponse.response != null ? ErrorResponse.response.status : -1,
                        "robloxMessage": ErrorResponse.response != null ? ErrorResponse.response.statusText : null,
                    }
                );
        
            const AssetType = ItemData.AssetTypeId;
            const IsOnSale = ItemData.IsPublicDomain;
            const ItemPrice = parseInt(ItemData.PriceInRobux);
            if (!IsOnSale && !CreatorOwnedItem)
                return CreateOutput(
                    this.OutputCodes.ERR_INVALID_ITEM,
                    `Cannot scan: Item is not on-sale / not whitelisted.`
                );
            else if (AssetType != 10)
                return CreateOutput(
                    this.OutputCodes.ERR_INVALID_ITEM,
                    `Cannot scan: Item type is not a Model.`
                );
            else if (!isNaN(ItemPrice) && ItemPrice > 0)
                return CreateOutput(
                    this.OutputCodes.ERR_INVALID_ITEM,
                    `Cannot scan: Item costs Robux.`
                );
        }

        let [FetchSessionSuccess, SessionToken] = await this.GetSessionToken(this.RobloxToken);
        if (!FetchSessionSuccess)
            return SessionToken;

        let AssetData, ErrorResponse;
        try {
            AssetData = (await axios({
                url: `https://assetdelivery.roblox.com/v1/asset/?id=${AssetId}`,
                headers: {
                    cookie: `.ROBLOSECURITY=${this.RobloxToken}`,
                    "x-csrf-token": SessionToken,
                },
                method: "GET",
                responseType: "arraybuffer"
            })).data;
        } catch (AxiosResponse: any) { ErrorResponse = AxiosResponse; }
        if (!AssetData)
            return CreateOutput(
                this.OutputCodes.ERR_INVALID_ITEM,
                `Cannot scan: Failed to obtain asset data.\n${ErrorResponse.response ? ErrorResponse.response.statusText : ErrorResponse}`,
                {
                    "robloxErrorCode": ErrorResponse.response != null ? ErrorResponse.response.status : -1,
                    "robloxMessage": ErrorResponse.response != null ? ErrorResponse.response.statusText : null,
                }
            );
        
        let ParseResult;
        try {
            ParseResult = FileParser(AssetData, null).result;
        } catch(err: any) {
            return CreateOutput(
                this.OutputCodes.ERR_CANNOT_PARSE_MODEL,
                `Cannot scan: Encountered an error (${err.toString()})`
            )
        }

        // Find malicious scripts
        // W.I.P.
        let foundScripts: string[] = [];
        let scanResults: {[scriptName: string]: [{
            line: number,
            column: number,
            message: string
        }?]} = {};
        let isMalicious = false;
        let filterList: {[filterText: string]: {type: "function" | "string", report: string, exceptions?: RegExp[]}} = this.ScriptsFilterList.server;

        function canMakeException(source: string, caughtEndIndex: number, filterData: {type: "function" | "string", report: string, exceptions?: RegExp[]}): boolean {
            if (!filterData.exceptions) {
                return false;
            }

            filterData.exceptions.forEach((exception) => {
                const found = source.match(exception);
                if (found) {
                    return found.index == caughtEndIndex + 1;
                }
            })
            return false;
        }

        function scan(instanceTrees: Instance[], instanceTreeString: string = "") {
            instanceTrees.forEach((instance: Instance) => {
                const instanceName: string = instance.Properties.Name.value;
                if (["Script", "LocalScript", "ModuleScript"].indexOf(instance.Properties.ClassName.value) !== -1) {
                    const scriptName = `${instanceTreeString}${instanceName}`;
                    foundScripts.push(scriptName);

                    // Filter (for now, might do a full luau execution soon (if i can))
                    let scriptSource: string | undefined = instance.Properties["Source"]?.value;
                    if (scriptSource) {
                        scriptSource = scriptSource.toLowerCase();
                        Object.keys(filterList).forEach((text: string) => {
                            const filterData = filterList[text];
                            const reversed: string = reverseString(text);
                            const toBytecodeRepresentation: number[] = text.split("").map(function(item) {
                                return item.charCodeAt(0);
                            });;
                            const bytecodeString: string = toBytecodeRepresentation.join("\\");
                            const reversedBytecodeString: string = toBytecodeRepresentation.reverse().join("\\");
                                
                            if (filterData.type == "function") {
                                const dotIndexs: {[kind: string]: string} = {
                                    normal: `.${text}`,
                                    reversed: `.${reversed}`,
                                    bytecode: `.${bytecodeString}`,
                                    reversedBytecode: `.${reversedBytecodeString}`
                                };
                                const colonIndexs: {[kind: string]: string} = {
                                    normal: `:${text}`,
                                    reversed: `:${reversed}`,
                                    bytecode: `:${bytecodeString}`,
                                    reversedBytecode: `:${reversedBytecodeString}`
                                };
                                
                                Object.keys(dotIndexs).forEach((kind: string) => {
                                    const indexInString: number = scriptSource?.indexOf(dotIndexs[kind]) || -1;
                                    const lineColumnInfo = getLineColumnFromIndex(scriptSource as string, indexInString);
                                    if (indexInString !== -1 && !canMakeException(scriptSource as string, indexInString + dotIndexs[kind].length - 1, filterData)) {
                                        isMalicious = true;
                                        if (!scanResults[scriptName]) {
                                            scanResults[scriptName] = [];
                                        }
                                        scanResults[scriptName].push({line: lineColumnInfo[0], column: lineColumnInfo[1], message: `${filterData.report} (identified as using ${kind} kind)`});
                                    }
                                });
                                Object.keys(colonIndexs).forEach((kind: string) => {
                                    const indexInString: number = scriptSource?.indexOf(colonIndexs[kind]) || -1;
                                    const lineColumnInfo = getLineColumnFromIndex(scriptSource as string, indexInString);
                                    if (indexInString !== -1 && !canMakeException(scriptSource as string, indexInString + colonIndexs[kind].length - 1, filterData)) {
                                        isMalicious = true;
                                        if (!scanResults[scriptName]) {
                                            scanResults[scriptName] = [];
                                        }
                                        scanResults[scriptName].push({line: lineColumnInfo[0], column: lineColumnInfo[1], message: `${filterData.report} (identified as using ${kind} kind)`});
                                    }
                                });
                            } else if (filterData.type == "string") {
                                const indexs: {[kind: string]: string} = {
                                    normal: text,
                                    reversed: reversed,
                                    bytecode: bytecodeString,
                                    reversedBytecode: reversedBytecodeString
                                };
                                
                                Object.keys(indexs).forEach((kind: string) => {
                                    const indexInString: number = scriptSource?.indexOf(indexs[kind]) || -1;
                                    const lineColumnInfo = getLineColumnFromIndex(scriptSource as string, indexInString);
                                    if (indexInString !== -1 && !canMakeException(scriptSource as string, indexInString + indexs[kind].length - 1, filterData)) {
                                        isMalicious = true;
                                        if (!scanResults[scriptName]) {
                                            scanResults[scriptName] = [];
                                        }
                                        scanResults[scriptName].push({line: lineColumnInfo[0], column: lineColumnInfo[1], message: `${filterData.report} (identified as using ${kind} kind)`});
                                    }
                                });
                            }
                        });
                    }
                }
                if (instance.Children.length > 0) {
                    let newInstanceTreeString = instanceTreeString == "" ? `${instanceName}.` : `${instanceTreeString}${instanceName}.`;
                    scan(instance.Children, newInstanceTreeString);
                }
            });
        }
        scan(ParseResult);

        return CreateOutput(
            isMalicious ? this.OutputCodes.SCAN_RESULT_MALICIOUS : this.OutputCodes.SCAN_RESULT_CLEAN,
            isMalicious ? `ID contains malicious scripts.` : `ID is all-good.`,
            {isMalicious: isMalicious, scanResult: scanResults}
        );
    }

    public async GetRobloxUserInfo(UserId: number) {
        let UserInfo;
        try {
            UserInfo = (await axios({
                url: `https://users.roblox.com/v1/users/${UserId}`,
                method: "GET"
            })).data;
        } catch (AxiosResponse) {}
        return UserInfo;
    }

    public GetRobloxNamePresenationByUserInfo(UserInfo: any) {
        return UserInfo.name == UserInfo.displayName ? UserInfo.name : `${UserInfo.displayName} (@${UserInfo.name})`;
    }

    public async FetchRobloxDataStore(UniverseId: number, DataStoreName: string, Scope: string | undefined, KeyName: string) {
        let Data;
        let openCloudUrl = new URL(`https://apis.roblox.com/datastores/v1/universes/${UniverseId}/standard-datastores/datastore/entries/entry`);
        openCloudUrl.searchParams.append("dataStoreName", DataStoreName);
        openCloudUrl.searchParams.append("entryKey", KeyName);
        openCloudUrl.searchParams.append("scope", Scope || "global");
        try {
            Data = (await axios({
                url: openCloudUrl.toString(),
                method: "GET",
                headers: {
                    "x-api-key": this.RobloxApiKey
                }
            })).data;
        } catch (AxiosResponse: any) {}
        return Data;
    }

    public async Internal_GetPlaceFile(PlaceId: number, ExpressResponse: Response) {
        try {
            const AxiosResponse = await axiosWithProxy({
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

    public async Internal_GetModelBinary(AssetId: number, ExpressResponse: Response) {
        const CreatorOwnedItem = await this.CheckIfUserOwnItem(AssetId, 138801491);
        let ItemData, ErrorResponse;
        try {
            ItemData = (await axios({
                url: `https://economy.roblox.com/v2/assets/${AssetId}/details`,
                method: "GET",
            })).data;
        } catch (AxiosResponse: any) { ErrorResponse = AxiosResponse; }
        if (!ItemData)
            ExpressResponse.status(400).send("Cannot get item data.");
    
        const AssetType = ItemData.AssetTypeId;
        const IsOnSale = ItemData.IsPublicDomain;
        const ItemPrice = parseInt(ItemData.PriceInRobux);
        if (!IsOnSale && !CreatorOwnedItem)
            return ExpressResponse.status(400).send("Item is not on-sale / not whitelisted.");
        else if (AssetType != 10)
            return ExpressResponse.status(400).send("Item is not a model.");
        else if (!isNaN(ItemPrice) && ItemPrice > 0)
            return ExpressResponse.status(400).send("Item costs robux.");

        try {
            const AxiosResponse = await axios({
                url: `https://assetdelivery.roblox.com/v1/asset/?id=${AssetId}`,
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

    public async HasAnnouncedLeaderboardReset() {
        const currentDate = new Date();
        const foundDocument = await LeaderboardResetAnnounceModel.findOne({
            month: currentDate.getUTCMonth(),
            year: currentDate.getUTCFullYear()
        }).exec();
        return foundDocument != null
    }

    public async SetAnnounceLeaderboardReset() {
        if (await this.HasAnnouncedLeaderboardReset()) {
            return;
        }

        const currentDate = new Date();
        await new LeaderboardResetAnnounceModel({
            month: currentDate.getUTCMonth(),
            year: currentDate.getUTCFullYear()
        }).save();
    }

    public async GetSoundFrequenciesData(SoundId: number, Compress: boolean) {
        let [FetchSessionSuccess, SessionToken] = await this.GetSessionToken(this.RobloxToken);

        if (!FetchSessionSuccess) {
            [FetchSessionSuccess, SessionToken] = await this.GetSessionToken(this.RobloxAudioToken);
            if (!FetchSessionSuccess)
                return SessionToken;
        }
        
        let AssetData, ErrorResponse;
        try {
            AssetData = (await axiosWithProxy({
                url: `https://assetdelivery.roblox.com/v1/assets/batch`,
                method: "POST",
                headers: {
                    cookie: `.ROBLOSECURITY=${this.RobloxToken}`,
                    "Roblox-Place-Id": 0,
                    "Roblox-Browser-Asset-Request": "true"
                },
                data: [{
                    requestId: SoundId,
                    assetId: SoundId
                }]
            })).data;
            if (AssetData[0]["errors"])
                AssetData = (await axiosWithProxy({
                    url: `https://assetdelivery.roblox.com/v1/assets/batch`,
                    method: "POST",
                    headers: {
                        cookie: `.ROBLOSECURITY=${this.RobloxAudioToken}`,
                        "Roblox-Place-Id": 0,
                        "Roblox-Browser-Asset-Request": "true"
                    },
                    data: [{
                        requestId: SoundId,
                        assetId: SoundId
                    }]
                })).data;
        } catch (AxiosResponse: any) { ErrorResponse = AxiosResponse; }
        if (!AssetData)
            return CreateOutput(
                this.OutputCodes.ERR_INVALID_ITEM,
                `Cannot get sound data: Failed to obtain item data.`,
                {
                    "robloxErrorCode": ErrorResponse && ErrorResponse.response != null ? ErrorResponse.response.status : -1,
                    "robloxMessage": ErrorResponse && ErrorResponse.response != null ? ErrorResponse.response.statusText : ErrorResponse,
                }
            );
        
        const audioUrl: string | undefined = AssetData[0]["location"];
        if (!audioUrl) 
            return CreateOutput(
                this.OutputCodes.ERR_INVALID_ITEM,
                `Cannot get sound data: Failed to find sound's url.`,
                {
                    "robloxData": AssetData,
                    "assetData": AssetData[0],
                }
            );

        
        let frequencyOutput: [[time: number, leftChannel: number, rightChannel: number, amplitudeSpan?: [Span: Array<number>, Length: number]]?] | string = [];
        if (this.SelectedServerType != "WEAK") {  
            const initialAudioBuffer: ArrayBuffer = (await axios.get(audioUrl, {responseType: "arraybuffer"})).data;
            const audioBuffer: Buffer = Buffer.from(initialAudioBuffer);
            const FFT_SIZE: number = 512;
                
            let decodedData = await decodeAudio(audioBuffer);
            let channelData: Float32Array = decodedData.getChannelData(0);
            let bufferStep = Math.floor(channelData.length / FFT_SIZE); // floor just in case
            let currentTime = 0;

            const timeDelay = 1 / 15;
            let currentDelay = 0;

            for (let i = 0; i < bufferStep; i++) {
                currentTime += FFT_SIZE / decodedData.sampleRate;
                if (currentTime < currentDelay)
                    continue;
                currentDelay = currentTime + timeDelay;

                let currentBufferData = channelData.slice(i * FFT_SIZE, (i + 1) * FFT_SIZE);
                let spectrum: Float32Array = Meyda.extract('amplitudeSpectrum', currentBufferData) as any;
                for (let j = 0; j < spectrum.length; j++) {
                    spectrum[j] /= 100; // Matches un4seen BASS (osu!lazer)
                }
                frequencyOutput.push([currentTime, 0, 0, [Array.from(spectrum), spectrum.length]]);
            }
        } else {
            try {
                frequencyOutput = (await axios.post(ExternalFrequencyProcessorUrl, {audioUrl: audioUrl})).data; 
            } catch (_) {
                frequencyOutput = [];
            }  
        }

        if (Compress) {
            frequencyOutput = zlib.deflateSync(typeof frequencyOutput != "string" ? JSON.stringify(frequencyOutput) : frequencyOutput).toString('base64');
        }

        return frequencyOutput;
    }

    constructor(SetRobloxToken?: string, SetRobloxApiKey?: string, SetRobloxAudioToken?: string, MongoDbUrl?: string, ServerType?: string) {
        if (SetRobloxToken == undefined)
            throw new Error("Backend: No Roblox Token was supplied.")
        if (SetRobloxApiKey == undefined)
            throw new Error("Backend: No Roblox Open Cloud API key was supplied.")
        if (SetRobloxAudioToken == undefined)
            SetRobloxAudioToken = "";
        if (MongoDbUrl == undefined)
            throw new Error("Backend: No MongoDB uri was supplied.")
        if (ServerType == undefined)
            ServerType = "WEAK";

        this.IDConverter = new IDConverterClass(
            "123456789*=+-aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",
            "0123456789"
        );
        this._privilegeKeyGenerator = new IDConverterClass(
            "qwertyuiopasdfghjklzxcvbnm0192837465",
            "5432189076"
        )
        this.RobloxToken = SetRobloxToken;
        this.RobloxApiKey = SetRobloxApiKey;
        this.RobloxAudioToken = SetRobloxAudioToken;
        mongoose.connect(MongoDbUrl);
        this.SelectedServerType = ServerType;

        Log("Backend initialize");
    }
}
export default Backend;
