import dotenv from "dotenv";

import {Bot} from "./bot";
import {DiscordClient} from "./DiscordClient";

export const services: {
    bot?: Bot,
    discord?: DiscordClient,
} = {};

export async function bootstrap(){
    dotenv.config();

    console.log("Initializing services..");
    const discordObject: any = {
        token: process.env.CLIENT_TOKEN,
        intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS"],
    };
    services.discord = await new DiscordClient(discordObject);

    console.log("Starting Bot..");
    services.bot = await new Bot(services.discord);
    await services.bot.assignCommands();
    await services.discord.start(() => {
        // Bot initialzied and ready to go!
    });
}