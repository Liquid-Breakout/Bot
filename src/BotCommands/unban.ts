import { ChatInputCommandInteraction, EmbedBuilder, Message, SlashCommandBuilder, SlashCommandIntegerOption, SlashCommandStringOption } from "discord.js";
import { DiscordBot, DiscordBotCompatibilityLayer } from "../Components/DiscordBot"

module.exports = {
    requires: ["PRIVILEGE", "INGAME_MODS"],
	slashData: new SlashCommandBuilder()
		.setName("unban")
		.setDescription("Unban a player.")
        .addIntegerOption((option: SlashCommandIntegerOption) => option.setName("user_id").setDescription("User ID of a player.").setRequired(true)),
	async execute(Bot: DiscordBot, Interaction: ChatInputCommandInteraction<any> | Message<boolean>, Arguments: any[]) {
		const newLayer = new DiscordBotCompatibilityLayer(Interaction, true);
        await newLayer.init(false);
        if (Interaction instanceof ChatInputCommandInteraction)
            if (Arguments.length == 0)
                Arguments = [Interaction.options.getInteger("user_id")]

        const userId: number | undefined = Arguments[0] ? parseInt(Arguments[0]) : undefined;
        if (!userId)
            return newLayer.reply("User ID must be a number.");
        
        // 2 database requests.........
        const isBanned = await Bot.Backend.IsPlayerBanned(userId);
        const banData = await Bot.Backend.GetPlayerBannedData(userId);
        if (banData == null || !isBanned) {
            return newLayer.reply(`${userId} is not banned.`);
        }
        const playerInfo = await Bot.Backend.GetRobloxUserInfo(banData.userId!);
        if (!playerInfo) {
            return newLayer.reply(`${userId} is not a Roblox User ID.`);
        }
        const playerName = Bot.Backend.GetRobloxNamePresenationByUserInfo(playerInfo);

        await Bot.Backend.UnbanPlayer(userId);

        newLayer.reply(`${playerName} (${userId}) has been unbanned.`);
	},
};