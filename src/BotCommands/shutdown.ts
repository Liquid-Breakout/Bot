import { ChatInputCommandInteraction, Message, SlashCommandBuilder, SlashCommandIntegerOption } from "discord.js";
import { DiscordBot, DiscordBotCompatibilityLayer } from "../Components/DiscordBot"

module.exports = {
    requires: ["PRIVILEGE"],
	async execute(Bot: DiscordBot, Interaction: ChatInputCommandInteraction<any> | Message<boolean>, Arguments: any[]) {
		const newLayer = new DiscordBotCompatibilityLayer(Interaction, true);
        await newLayer.init();
        if (Interaction instanceof ChatInputCommandInteraction)
            if (Arguments.length == 0)
                Arguments = [];

        await newLayer.reply("Force shutting down...");
        Bot.Client.destroy();
        Bot.Alive = false;
	},
};