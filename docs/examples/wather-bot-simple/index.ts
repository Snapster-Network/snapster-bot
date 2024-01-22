// Import the SnapsterBot class from the library
import { SnapsterBot } from "../../../src/index"
import { ScenesGenerator } from "./scenes";

// Retrieve the BOT_TOKEN environment variable
const { BOT_TOKEN } = process.env;
// Throw an error if the BOT_TOKEN is not defined
if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" is required');

// Create an instance of SnapsterBot using the BOT_TOKEN
const Bot = new SnapsterBot(BOT_TOKEN)

// Set the scenes for the bot, defining its behavior in different scenarios
Bot.setScenes(ScenesGenerator)

// Direct the bot to start with the "start" scene upon launch
Bot.sceneEnter("start")

// Launch the bot to start receiving and processing messages
Bot.launch()