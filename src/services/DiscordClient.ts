import {BaseClient, Collection, Snowflake} from "discord.js";

const Discord = require('discord.js');

export class DiscordClient{

    private readonly client: any = undefined;
    private readonly client_token: string = "";
    private prefix: string = "";

    constructor(private discordObject: any) {
        this.client = new Discord.Client({intents: this.discordObject.intents});
        this.client_token = this.discordObject.token;
        this.prefix = this.discordObject.prefix;

        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`);
        });
    }

    getClient(){return this.client;}
    getPrefix(){return this.prefix;}
    setPrefix(prefix: string){this.prefix = prefix;}

    // execute this at the end of every command
    async start(){
        return new Promise(async (resolve, reject) => {
            try {
                await this.client.login(this.client_token).then(() => {
                    resolve(true);
                });
            } catch (e: any) {
                console.log("DiscordClient::start() - Error: " + e);
                reject(e);
            }
        });
    }

    async createMessageEvent(string_in: string, string_out: string){
        return new Promise(async (resolve, reject) => {
            try {
                this.client.on('message', async (message: any) => {
                    if (message.author.bot) return;
                    if (message.content.startsWith(this.prefix)) {
                        const command: string = message.content.split("$")[1];
                        const args: string[] = message.content.split(" ").slice(1);

                        if (command === "bye") {
                            message.reply("Goodbye!");
                        }
                    }
                });
                resolve("DiscordClient::createMessageEvent() - Success");
            } catch (e: any) {
                console.log("DiscordClient::createMessageEvent() - Error: " + e);
                reject(e);
            }
        });
    }

    async listAllChannels(){
        return new Promise(async (resolve, reject) => {
            try {
                const list: any[] = [];
                const channels: Collection<Snowflake, any> = await this.client.channels.cache;

                channels.forEach((channel: any) => {
                    list.push({name: channel.name, id: channel.id});
                });

                resolve(list);
            } catch (e: any) {
                console.log("DiscordClient::listChannelIds() - Error: " + e);
                reject(e);
            }
        });
    }

    async getChannelIdByName(channel_name: string){
        return new Promise(async (resolve, reject) => {
            try {
                const channels: any = await this.listAllChannels();
                Object.values(channels).filter((channel: any) => {
                    if (channel.name === channel_name) {
                        resolve(channel.id);
                    }
                });
                console.log("DiscordClient::getChannelIdByName() - Error: Channel not found");
            } catch (e: any) {
                console.log("DiscordClient::getChannelIdByName() - Error: " + e);
                reject(e);
            }
        });
    }

    async getChannelNameById(channel_id: string){
        return new Promise(async (resolve, reject) => {
            try {
                await this.client.channels.fetch(channel_id).then((channel: any) => {
                    resolve(channel.name);
                });
            } catch (e: any) {
                console.log("DiscordClient::getChannelNameById() - Error: " + e);
                reject(e);
            }
        });
    }

    async sendImage(channel_id: string, image_url: string){
        return new Promise(async (resolve, reject) => {
            try {
                const channel: any = this.client.channels.cache.get(channel_id);
                const attachment: any = new Discord.MessageAttachment(image_url);
                const msg: any = await channel.send(attachment);
                resolve(msg);
            } catch (e: any) {
                console.log("DiscordClient::sendImage() - Error: " + e);
                reject(e);
            }
        });
    }
}


