const Discord = require('discord.js');

export class DiscordClient{

    private readonly client: any = undefined;
    private readonly client_token: string = "";

    constructor(private discordObject: any) {
        this.client = new Discord.Client({intents: this.discordObject.intents});
        this.client_token = this.discordObject.token;

        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`);
        });
    }

    getClient(){return this.client;}

    // execute this at the end of every command
    async start(callback: () => void){
        return new Promise(async (resolve, reject) => {
            try {
                await this.client.login(this.client_token);
                resolve(callback());
            } catch (e: any) {
                console.log("DiscordClient::start() - Error: " + e);
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


