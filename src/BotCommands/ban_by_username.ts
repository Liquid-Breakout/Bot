import { ChatInputCommandInteraction, EmbedBuilder, Message, SlashCommandBuilder, SlashCommandIntegerOption, SlashCommandStringOption } from "discord.js";
import { DiscordBot, DiscordBotCompatibilityLayer } from "../Components/DiscordBot"

module.exports = {
    requires: ["PRIVILEGE"],
	slashData: new SlashCommandBuilder()
		.setName("ban_by_username")
		.setDescription("Ban a player, using their username.")
        .addStringOption((option: SlashCommandStringOption) => option.setName("user_name").setDescription("User name of a player.").setRequired(true))
        .addIntegerOption((option: SlashCommandIntegerOption) => option.setName("ban_duration").setDescription("Ban duration (in minutes). Set to -1 will ban for indefinitely.").setRequired(true))
        .addStringOption((option: SlashCommandStringOption) => option.setName("reason").setDescription("Ban reason").setRequired(true)),
	async execute(Bot: DiscordBot, Interaction: ChatInputCommandInteraction<any> | Message<boolean>, Arguments: any[]) {
		const newLayer = new DiscordBotCompatibilityLayer(Interaction, true);
        await newLayer.init(false);
        if (Interaction instanceof ChatInputCommandInteraction)
            if (Arguments.length == 0)
                Arguments = [Interaction.options.getString("user_name"), Interaction.options.getInteger("ban_duration"), Interaction.options.getString("reason")]

        const username: string | undefined = Arguments[0];
        if (!username)
            return newLayer.reply("User name must be a string.");
        const banDuration: number | undefined = Arguments[1] ? parseInt(Arguments[1]) : undefined;
        if (!banDuration)
            return newLayer.reply("Ban duration must be a number.");
        if (banDuration != -1 && banDuration < 0) {
            return newLayer.reply("Ban duration cannot be negative. (Set to -1 if you want to ban for indefinite duration.)");
        }
        let banReason: string | undefined = Arguments[2];
        if (!banReason) {
            banReason = "None specified.";
        }

        const playerInfo = await Bot.Backend.GetRobloxUserInfoByUsername(username);
        if (!playerInfo) {
            return newLayer.reply(`${username} is not a Roblox User name.`);
        }
        const playerName = Bot.Backend.GetRobloxNamePresenationByUserInfo(playerInfo);

        await Bot.Backend.BanPlayer("Discord", playerInfo.id, banDuration, newLayer.author ? `@${newLayer.author.tag}` : "unknown", banReason);
        let erasedFromLeaderboardState = await Bot.Backend.RemovePlayerFromLeaderboard(playerInfo.id);

        const currentDate = new Date();
        const currentTime = Math.floor(currentDate.getTime() / 1000);
        newLayer.reply(`${playerName} (${playerInfo.id}) has been banned until ${banDuration != -1 ? `<t:${currentTime + banDuration * 60}:F>` : "indefinitely."}, ${erasedFromLeaderboardState ? "and has been successfully wiped from the leaderboards" : "however they cannot be wiped from the leaderboards (due to an error?)"}`);
	},
};