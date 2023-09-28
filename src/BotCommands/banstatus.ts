import { ChatInputCommandInteraction, EmbedBuilder, Message, SlashCommandBuilder, SlashCommandIntegerOption } from "discord.js";
import { DiscordBot, DiscordBotCompatibilityLayer } from "../Components/DiscordBot"

module.exports = {
	slashData: new SlashCommandBuilder()
		.setName("banstatus")
		.setDescription("Get a ban's status of a player.")
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

        const banData = await Bot.Backend.GetPlayerBannedData(userId);
        if (banData == null) {
            return newLayer.reply(`${userId} is not banned.`);
        }
        const playerInfo = await Bot.Backend.GetRobloxUserInfo(banData.userId!);
        if (!playerInfo) {
            return newLayer.reply(`${userId} is not a Roblox User ID.`);
        }
        const playerName = this.Backend.GetRobloxNamePresenationByUserInfo(playerInfo);

        const embed = new EmbedBuilder()
            .setTitle(`${playerName}'s ban info`)
            .addFields(
                {
                    name: "Banned Time",
                    value: `<t:${banData.bannedTime!}:F>`,
                },
                {
                    name: "Banned Until",
                    value: banData.bannedUntil != -1 ? `<t:${banData.bannedUntil!}:F>` : "Indefintely",
                },
                {
                    name: "Reason",
                    value: banData.reason || "None specified.",
                },
            )

        newLayer.reply({embeds: [embed]});
	},
};