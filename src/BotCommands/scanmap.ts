import { ChatInputCommandInteraction, Message, SlashCommandBuilder, SlashCommandIntegerOption } from "discord.js";
import { DiscordBot, DiscordBotCompatibilityLayer } from "../DiscordBot"

module.exports = {
	slashData: new SlashCommandBuilder()
		.setName('scanmap')
		.setDescription('Scan map and detect potential malicious scripts.')
        .addIntegerOption((option: SlashCommandIntegerOption) => option.setName("asset_id").setDescription("The numeric ID of the asset needed to be scanned.").setRequired(true)),
	async execute(Bot: DiscordBot, Interaction: ChatInputCommandInteraction<any> | Message<boolean>, Arguments: any[]) {
		const newLayer = new DiscordBotCompatibilityLayer(Interaction, true);
        await newLayer.init(false);
        if (Interaction instanceof ChatInputCommandInteraction)
            if (Arguments.length == 0)
                Arguments = [Interaction.options.getInteger('asset_id')]

        const RequestAssetId: number | undefined = Arguments[0] ? parseInt(Arguments[0]) : undefined;
        if (!RequestAssetId)
            return newLayer.reply("Asset ID must be a number.");

        const ScanResult = await Bot.Backend.ScanForMaliciousScripts(RequestAssetId);
        if (ScanResult.code == Bot.Backend.OutputCodes.SCAN_RESULT_CLEAN) {
            await newLayer.reply("Scanned successfully. Your map is clean!");
        } else if (ScanResult.code == Bot.Backend.OutputCodes.SCAN_RESULT_MALICIOUS) {
            let scanResultCollected: string[] = [];
            Object.keys(ScanResult.data.scanResult).forEach((scriptName: string) => {
                let collectedResults: string[] = [];
                ScanResult.data.scanResult[scriptName].forEach((caughtData: any) => {
                    collectedResults.push(`- Line ${caughtData.line}, at column ${caughtData.column}: \`${caughtData.message}\``);
                })
                scanResultCollected.push(`\`${scriptName}\`:\n${collectedResults.join("\n")}`);
            });

            await newLayer.reply(`Scanned successfully. Your model contains potentially malicious scripts:\n${scanResultCollected.join("\n")}`);
        } else {
            await newLayer.reply(ScanResult.message);
        }

        if (Interaction instanceof Message && Interaction.guild != null)
            newLayer.delete();
	},
};