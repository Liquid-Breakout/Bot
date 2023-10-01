import { ChatInputCommandInteraction, EmbedBuilder, Message, SlashCommandBuilder, SlashCommandIntegerOption, SlashCommandStringOption } from "discord.js";
import { DiscordBot, DiscordBotCompatibilityLayer } from "../Components/DiscordBot"

module.exports = {
    requires: ["PRIVILEGE"],
	slashData: new SlashCommandBuilder()
		.setName("unban_by_username")
		.setDescription("Unban a player, using their username.")
        .addStringOption((option: SlashCommandStringOption) => option.setName("user_name").setDescription("User name of a player.").setRequired(true)),
	async execute(Bot: DiscordBot, Interaction: ChatInputCommandInteraction<any> | Message<boolean>, Arguments: any[]) {
		const newLayer = new DiscordBotCompatibilityLayer(Interaction, true);
        await newLayer.init(false);
        if (Interaction instanceof ChatInputCommandInteraction)
        if (Arguments.length == 0)
            Arguments = [Interaction.options.getString("user_name")]

        const username: string | undefined = Arguments[0];
        if (!username)
            return newLayer.reply("User name must be a string.");
        
        const playerInfo = await Bot.Backend.GetRobloxUserInfoByUsername(username);
        if (!playerInfo) {
            return newLayer.reply(`${username} is not a Roblox User name.`);
        }
        // 2 database requests.........
        const isBanned = await Bot.Backend.IsPlayerBanned(playerInfo.id);
        const banData = await Bot.Backend.GetPlayerBannedData(playerInfo.id);
        if (banData == null || !isBanned) {
            return newLayer.reply(`${username} is not banned.`);
        }
        const playerName = Bot.Backend.GetRobloxNamePresenationByUserInfo(playerInfo);

        await Bot.Backend.UnbanPlayer(playerInfo.id);

        newLayer.reply(`${playerName} (${playerInfo.id}) has been unbanned.`);
	},
};