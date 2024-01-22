// Import the SnapsterBot class from the library
import { SnapsterBot } from "../../../src/index"

// Retrieve the BOT_TOKEN environment variable
const { BOT_TOKEN } = process.env;
// Throw an error if the BOT_TOKEN is not defined
if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" is required');

// Create an instance of SnapsterBot using the BOT_TOKEN
const Bot = new SnapsterBot(BOT_TOKEN)

// Define a listener for messages containing "12345" and respond with "Nice numbers!"
Bot.hearMessage("12345", async (ctx) => ctx.reply("Nice numbers!"))

// Define a listener for the "/admin" command and respond with "Hello admin!"
Bot.hearCommand("/admin", async (ctx) => ctx.reply("Hello admin!"))

// Define a generic listener for any new message and respond with "Hi there"
Bot.onNewMessage(async (ctx) => ctx.reply("Hi there"))

// Send a message "Hi user" to a specific chat identified by the given ID
Bot.sendMessage("d:65aa43350b1d9be52690d2cc", "Hi user")

// Launch the bot to start receiving and processing messages
Bot.launch()