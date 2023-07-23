import { ChatInputCommandInteraction, Message, SlashCommandBuilder, SlashCommandIntegerOption, Channel, TextChannel } from "discord.js";
import { DiscordBot, DiscordBotCompatibilityLayer } from "../DiscordBot"

module.exports = {
	slashData: new SlashCommandBuilder()
		.setName('whitelist')
		.setDescription('Whitelist an asset.')
        .addIntegerOption((option: SlashCommandIntegerOption) => option.setName("asset_id").setDescription("The numeric ID of the asset needed to be whitelisted.").setRequired(true)),
	async execute(Bot: DiscordBot, Interaction: ChatInputCommandInteraction<any> | Message<boolean>, Arguments: any[]) {
		const newLayer = new DiscordBotCompatibilityLayer(Interaction, true);
        await newLayer.init();
        if (Interaction instanceof ChatInputCommandInteraction)
            if (Arguments.length == 0)
                Arguments = [Interaction.options.getInteger('asset_id')]

        const RequestAssetId: number | undefined = Arguments[0] ? parseInt(Arguments[0]) : undefined;
        if (!RequestAssetId)
            return newLayer.reply("Asset ID must be a number.");

        const WhitelistOutput = await Bot.Backend.WhitelistAsset(RequestAssetId, NaN);
        if (WhitelistOutput.code == Bot.Backend.OutputCodes.OPERATION_SUCCESS) {
            const shareableId: number | undefined = WhitelistOutput.data ? WhitelistOutput.data["shareableId"] : undefined;
            await newLayer.reply(`Whitelisted successfully!${shareableId != undefined ? ` Your shareable ID is: \`\`${shareableId}\`\`` : ""}`);
        } else if (WhitelistOutput.code == Bot.Backend.OutputCodes.ALREADY_WHITELISTED)
            await newLayer.reply(`Already whitelisted. Use getshareid command to get the shareable ID.`);
        else {
            if (WhitelistOutput.code == Bot.Backend.OutputCodes.SCAN_RESULT_MALICIOUS) {
                let scanResultCollected: string[] = [];
                Object.keys(WhitelistOutput.data.scanResult).forEach((scriptName: string) => {
                    let collectedResults: string[] = [];
                    WhitelistOutput.data.scanResult[scriptName].forEach((caughtData: any) => {
                        collectedResults.push(`- Line ${caughtData.line}, at column ${caughtData.column}: \`${caughtData.message}\``);
                    })
                    scanResultCollected.push(`\`${scriptName}\`:\n${collectedResults.join("\n")}`);
                });

                await newLayer.reply(`Error while whitelisting: Your model contains potentially malicious scripts:\n${scanResultCollected.join("\n")}\n\n**Resolve these issues in order for whitelisting to continue.**`);

                // Send to LB team
                try {
                    const gotChannel: Channel | undefined = Bot.Client.channels.cache.get("1041043326352236574");
                    if (gotChannel) {
                        await (gotChannel as TextChannel).send(`<@&1041041978000949278> ID ${RequestAssetId} contains malicious scripts, please review: ${scanResultCollected.join("\n")}`);
                    }
                } catch (_) {}
            } else {
                await newLayer.reply(`Error while whitelisting!\nCode: ${Bot.Backend.LookupNameByOutputCode(WhitelistOutput.code)}${WhitelistOutput.message != undefined ? `\n${WhitelistOutput.message}` : ""}`)
            }
        }
        
        if (WhitelistOutput.code == Bot.Backend.OutputCodes.OPERATION_SUCCESS || WhitelistOutput.code == Bot.Backend.OutputCodes.ALREADY_WHITELISTED)
            await Bot.LogWhitelist(newLayer.author, `<@${newLayer.author?.id}>`, RequestAssetId, true, WhitelistOutput.message)
        else
            await Bot.LogWhitelist(newLayer.author, `<@${newLayer.author?.id}>`, RequestAssetId, false, `Code: ${Bot.Backend.LookupNameByOutputCode(WhitelistOutput.code)}\n${WhitelistOutput.message}`)

        if (Interaction instanceof Message && Interaction.guild != null)
            newLayer.delete();
	},
};