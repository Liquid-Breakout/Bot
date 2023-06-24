import { AnyChannel, Client, Intents, Message, TextChannel, WebhookClient } from "discord.js";
import Backend from "./Backend";

class DiscordBot {
    private _backend: Backend;
    private _client: Client;

    private _token: string;
    
    private privilegeUsers: string[] = ["915410908921077780", "849118831251030046"];
    private reverseShortPrivilegeUsers: string[] = ["915410908921077780", "849118831251030046", "324812431165751298"];

    public Alive: boolean;
    public Prefix: string;

    public UpdatePresence(ActivityName: string) {
        let botUser = this._client.user;
        if (botUser) {
            botUser.setActivity(`Rewrite | ${ActivityName} | Run ${this.Prefix}help | Made by cutymeo.`, {
                type: "WATCHING",
            });
        }
    }

    public async OnMessage(Message: Message): Promise<any> {
        if (!Message || !Message.content.startsWith(this.Prefix) || !this.Alive)
            return;
        const Arguments: string[] = Message.content.slice(this.Prefix.length).trim().split(/ +/);
        let CommandName: string | undefined = Arguments.shift();
        if (!CommandName) return;
        CommandName = CommandName.toLowerCase();

        this.UpdatePresence(`Processing ${CommandName} for ${Message.author.tag}`);
    
        if (CommandName == "whitelist") {
            const RequestAssetId: number | undefined = Arguments[0] ? parseInt(Arguments[0]) : undefined;

            if (!RequestAssetId) {
                this.UpdatePresence("Pending.");
                return Message.reply("Asset ID must be a number.");
            }
            const WhitelistOutput = await this._backend.WhitelistAsset(RequestAssetId, NaN);
            this.UpdatePresence("Pending.");
            if (WhitelistOutput.code == this._backend.OutputCodes.OPERATION_SUCCESS) {
                const shareableId: number | undefined = WhitelistOutput.data ? WhitelistOutput.data["shareableId"] : undefined;
                await Message.reply(`Whitelisted successfully!${shareableId != undefined ? ` Your shareable ID is: \`\`${shareableId}\`\`` : ""}`);
            } else if (WhitelistOutput.code == this._backend.OutputCodes.ALREADY_WHITELISTED)
                await Message.reply(`Already whitelisted. Use ${this.Prefix}getshareid to get the shareable ID.`);
            else
                await Message.reply(`Error while whitelisting!\nCode: ${this._backend.LookupNameByOutputCode(WhitelistOutput.code)}${WhitelistOutput.message != undefined ? `\n${WhitelistOutput.message}` : ""}`)
            if (Message.guild != null)
                Message.delete();
        } else if (CommandName == "test") {
            this.UpdatePresence("Pending.");
            Message.reply("Hello! I'm alive!");
        } else if (CommandName == "shutdown") {
            if (this.privilegeUsers.indexOf(Message.author.id) == -1)
                return Message.reply("You cannot use this command!");
            this.UpdatePresence("Pending.");
            await Message.reply("Force shutting down...");
            this._client.destroy();
            this.Alive = false;
        } else if (CommandName == "broadcast") {
            if (this.privilegeUsers.indexOf(Message.author.id) == -1) return Message.reply("You cannot use this command!");
            const BroadcastMessage: string = Arguments.join(" ");
            const BroadcastChannel: string = "1041032381668282450";
            Message.reply(`Broadcasting "${BroadcastMessage}"...`);

            const gotChannel: AnyChannel | undefined = this._client.channels.cache.get(BroadcastChannel);
            if (gotChannel) 
                (gotChannel as TextChannel).send(BroadcastMessage);

            this.UpdatePresence("Pending.");
        } else if (CommandName == "getshareid") {
            await Message.reply(`Your shareable ID is: \`\`${this._backend.IDConverter.Short(Arguments[0])}\`\``);
            if (Message.guild != null)
                Message.delete();

            this.UpdatePresence("Pending.");
        } else if (CommandName == "getnumberid") {
            if (this.reverseShortPrivilegeUsers.indexOf(Message.author.id) == -1)
                return Message.reply("You cannot use this command!");
            await Message.reply(`\`\`${Arguments[0]}\`\` converted to \`\`${this._backend.IDConverter.Number(Arguments[0])}\`\``);
            if (Message.guild != null)
                Message.delete();

            this.UpdatePresence("Pending.");
        } else if (CommandName == "help") {
            Message.reply(";help: This Message\n;whitelist [id]: Whitelist a map\n;getshareid [id]: Create a shareable ID (Short ID in FE2CM terms).");
            this.UpdatePresence("Pending.");
        } else if (CommandName == "createapikey") {
            if (this.privilegeUsers.indexOf(Message.author.id) == -1)
                return Message.reply("You cannot use this command!");
            const newKey = await this._backend.CreateApiKeyEntry();
            Message.reply(`Successfully created new key, your key is: \`\`${newKey}\`\``);
            this.UpdatePresence("Pending.");
        } else if (CommandName == "assignkeyownership") {
            const SelectedApiKey: string | undefined = Arguments[0] || undefined;
            if (!SelectedApiKey) {
                this.UpdatePresence("Pending.");
                return Message.reply("An API key must be provided.");
            }
            const AssignOwner: string | undefined = Arguments[1] || undefined;
            if (!AssignOwner) {
                this.UpdatePresence("Pending.");
                return Message.reply("A username must be provided.");
            }

            const output = await this._backend.SetApiKeyEntryValue("byKey", SelectedApiKey, "assignOwner", AssignOwner);
            if (output.code == this._backend.OutputCodes.OPERATION_SUCCESS)
                Message.reply(`Successfully assigned \`\`${AssignOwner}\`\` to \`\`${SelectedApiKey}\`\``);
            else
                Message.reply(`Failed to assign, error: ${output.message}`);
            
            this.UpdatePresence("Pending.");
        } else if (CommandName == "assignkeydiscord") {
            const SelectedApiKey: string | undefined = Arguments[0] || undefined;
            if (!SelectedApiKey) {
                this.UpdatePresence("Pending.");
                return Message.reply("An API key must be provided.");
            }
            const AssignOwner: number | undefined = Arguments[1] ? parseInt(Arguments[1]) : undefined;;
            if (!AssignOwner) {
                this.UpdatePresence("Pending.");
                return Message.reply("Discord user ID must be a number.");
            }

            const output = await this._backend.SetApiKeyEntryValue("byKey", SelectedApiKey, "associatedDiscordUser", AssignOwner.toString());
            if (output.code == this._backend.OutputCodes.OPERATION_SUCCESS)
                Message.reply(`Successfully assigned \`\`${AssignOwner}\`\` to \`\`${SelectedApiKey}\`\``);
            else
                Message.reply(`Failed to assign, error: ${output.message}`);
                
            this.UpdatePresence("Pending.");
        } else if (CommandName == "swapapikey") {
            const SelectedApiKey: string | undefined = Arguments[0] || undefined;
            if (!SelectedApiKey) {
                this.UpdatePresence("Pending.");
                return Message.reply("An API key must be provided.");
            }
            const NewApiKey: string | undefined = Arguments[1] || undefined;
            if (!NewApiKey) {
                this.UpdatePresence("Pending.");
                return Message.reply("A new API key must be provided.");
            }

            const output = await this._backend.SetApiKeyEntryValue("byKey", SelectedApiKey, "value", NewApiKey);
            if (output.code == this._backend.OutputCodes.OPERATION_SUCCESS)
                Message.reply(`Switched \`\`${NewApiKey}\`\` to \`\`${SelectedApiKey}\`\``);
            else
                Message.reply(`Failed to assign, error: ${output.message}`);
                
            this.UpdatePresence("Pending.");
        } else if (CommandName == "findapikeysfromuser") {
            const SearchValue: string | undefined = Arguments[0] || undefined;
            if (!SearchValue) {
                this.UpdatePresence("Pending.");
                return Message.reply("A search string must be provided.");
            }

            const documents = await this._backend.GetApiKeysFromUser(SearchValue);
            var keys: any[] = [];
            documents.forEach(async (document) => keys.push(`\`\`${document.value}\`\``));

            if (keys.length > 0)
                Message.reply(`Found ${keys.length} key(s): ${keys.join(", ")}`);
            else
                Message.reply("No keys found.")
                
            this.UpdatePresence("Pending.");
        } else if (CommandName == "toggleapikey") {
            const SelectedApiKey: string | undefined = Arguments[0] || undefined;
            if (!SelectedApiKey) {
                this.UpdatePresence("Pending.");
                return Message.reply("An API key must be provided.");
            }
            const ToggleValue: string | undefined = Arguments[1] || undefined;
            if (!ToggleValue || (ToggleValue != "false" && ToggleValue != "true")) {
                this.UpdatePresence("Pending.");
                return Message.reply("Toggle value must be either true or false.");
            }

            const trueToggle = ToggleValue == "true" ? true : false;
            const output = await this._backend.SetApiKeyEntryValue("byKey", SelectedApiKey, "enabled", trueToggle);
            if (output.code == this._backend.OutputCodes.OPERATION_SUCCESS)
                Message.reply(`Successfully toggled \`\`${SelectedApiKey}\`\` enabled value to \`\`${ToggleValue}\`\``);
            else
                Message.reply(`Failed to toggle, error: ${output.message}`);
                
            this.UpdatePresence("Pending.");
        } else if (CommandName == "toggleapikeybyuser") {
            const User: string | undefined = Arguments[0] || undefined;
            if (!User) {
                this.UpdatePresence("Pending.");
                return Message.reply("User must be a string.");
            }
            const ToggleValue: string | undefined = Arguments[1] || undefined;
            if (!ToggleValue || (ToggleValue != "false" && ToggleValue != "true")) {
                this.UpdatePresence("Pending.");
                return Message.reply("Toggle value must be either true or false.");
            }

            const trueToggle = ToggleValue == "true" ? true : false;
            const output = await this._backend.SetApiKeyEntryValue("byOwner", User, "enabled", trueToggle);
            if (output.code == this._backend.OutputCodes.OPERATION_SUCCESS)
                Message.reply(`Successfully toggled ${User}'s api keys enabled value to \`\`${ToggleValue}\`\``);
            else
                Message.reply(`Failed to toggle, error: ${output.message}`);
                
            this.UpdatePresence("Pending.");
        }
    }

    public start() {
        this._client.on("ready", () => {
            this.Alive = true;
            console.log("DiscordBot: Ready for command");
            this.UpdatePresence("Pending");
        });
        this._client.on("messageCreate", (async (Message: Message): Promise<any> => this.OnMessage(Message)));
        this._client.login(this._token);
        this.UpdatePresence("Pending");

        console.log("DiscordBot: Login success, bot ready");
    }

    constructor(Backend: any, Prefix: string, BotToken?: string) {
        if (BotToken == undefined)
            throw new Error("DiscordBot: No Bot Token was supplied.")
            
        this._backend = Backend;
        this._client = new Client({
            partials: ["CHANNEL"],
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_MESSAGE_TYPING,
                Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                Intents.FLAGS.DIRECT_MESSAGE_TYPING,
            ],
        });
        this._token = BotToken;
        this.Prefix = Prefix
        this.Alive = false;
        
        console.log("DiscordBot initialize");
    }
}

export default DiscordBot;