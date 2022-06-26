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
    }
}
