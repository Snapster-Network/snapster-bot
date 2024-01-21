import { SnapsterBot } from "../../src/index"

const { BOT_TOKEN } = process.env;
if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" is required!');
const Bot = new SnapsterBot(BOT_TOKEN)

Bot.hearMessage("12345", async (ctx) => ctx.reply("Nice numbers!"))

Bot.hearCommand("/admin", async (ctx) => ctx.reply("Hello admin!"))

Bot.sendMessage("d:65aa43350b1d9be52690d2cc", "Hi user")