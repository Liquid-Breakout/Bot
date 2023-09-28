import { ChatInputCommandInteraction, EmbedBuilder, Message, SlashCommandBuilder, SlashCommandIntegerOption, SlashCommandStringOption } from "discord.js";
import { DiscordBot, DiscordBotCompatibilityLayer } from "../Components/DiscordBot"

module.exports = {
    requires: ["PRIVILEGE"],
	slashData: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Ban a player.")
        .addIntegerOption((option: SlashCommandIntegerOption) => option.setName("user_id").setDescription("User ID of a player.").setRequired(true))
        .addIntegerOption((option: SlashCommandIntegerOption) => option.setName("ban_duration").setDescription("Ban duration (in minutes). Set to -1 will ban for indefinitely.").setRequired(true))
        .addStringOption((option: SlashCommandStringOption) => option.setName("reason").setDescription("Ban reason").setRequired(true)),
	async execute(Bot: DiscordBot, Interaction: ChatInputCommandInteraction<any> | Message<boolean>, Arguments: any[]) {
		const newLayer = new DiscordBotCompatibilityLayer(Interaction, true);
        await newLayer.init(false);
        if (Interaction instanceof ChatInputCommandInteraction)
            if (Arguments.length == 0)
                Arguments = [Interaction.options.getInteger("user_id"), Interaction.options.getInteger("ban_duration"), Interaction.options.getString("reason")]

        const userId: number | undefined = Arguments[0] ? parseInt(Arguments[0]) : undefined;
        if (!userId)
            return newLayer.reply("User ID must be a number.");
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

        const playerInfo = await Bot.Backend.GetRobloxUserInfo(userId);
        if (!playerInfo) {
            return newLayer.reply(`${userId} is not a Roblox User ID.`);
        }
        const playerName = Bot.Backend.GetRobloxNamePresenationByUserInfo(playerInfo);

        await Bot.Backend.BanPlayer(userId, banDuration, newLayer.author ? `@${newLayer.author.tag} (Discord)` : "unknown (Discord)", banReason);
        
        const currentDate = new Date();
        const currentTime = Math.floor(currentDate.getTime() / 1000);
        newLayer.reply(`${playerName} (${userId}) has been banned until ${banDuration != -1 ? `<t:${currentTime + banDuration * 60}:F>` : "indefinitely."}`);
	},
};