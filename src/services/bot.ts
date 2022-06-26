export class Bot{

    constructor(private Discord: any) {}

    async assignCommands() {
        // "hi" => "hello"
        this.Discord.getClient().on("messageCreate", async (message: any) => {
            if (message.author.bot) return;
            if (message.content.startsWith("$")) {
                const command: string = message.content.split("$")[1];
                const args: string[] = message.content.split(" ").slice(1);

                if (command === "hi") {
                    message.reply("Hello!");
                }
            }
        });

        // "bye" => "goodbye"
        this.Discord.getClient().on("messageCreate", async (message: any) => {
            if (message.author.bot) return;
            if (message.content.startsWith("$")) {
                const command: string = message.content.split("$")[1];
                const args: string[] = message.content.split(" ").slice(1);

                if (command === "bye") {
                    message.reply("Goodbye!");
                }
            }
        });

        await this.Discord.createMessageEvent("pee", "poo");
    }

    async test(){
        await this.sleep(2000);
        console.log("Bot::test() executed");

        const channels: any = await this.Discord.getChannelNameById("916078295160873000");
        console.log(channels);
    }

    private async sleep(number: number) {
        return new Promise(resolve => setTimeout(resolve, number));
    }
}
