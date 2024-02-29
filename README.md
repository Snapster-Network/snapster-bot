# Snapster Bot Library
**snapster-bot** - is a Node.js library designed to create and manage bots on the Snapster platform. This library simplifies the interaction with the Snapster API, allowing developers to easily send messages, handle commands, notifications, work with scenes and context, and all other features of the Snapster Bot API.
## Features

- Sending and receiving messages.
- Processing custom commands.
- Managing Long Polling connections with the Snapster API.
- Error handling and reconnection strategies.
- Scene management for advanced message processing logic.
- Work with scenes, sessions, and context.
## Installation

To install the library via npm, run the following command:

`npm install snapster-bot`
## API

Description of the methods used in the project. Divided into:
`Bot.[method]` and `ctx.[direction].[method]`.

### Bot methods

**SnapsterBot(token: string)**  
Constructor for creating a new bot instance.

**sendMessage(chatId: string, text: string): Promise**.  
Sends a message to a specific chat.

**hearMessage(message: string, handler: Function): void**  
Sets the handler for a specific message up to 4096 characters.

**hearCommand(command: string, handler: Function): void**  
Sets the handler for a specific command.

**onNewMessage(handler: Function): void**  
Sets a general handler for any new message.

**sceneEnter(sceneName: string): void**  
Sets the handler for entering a specific scene.

**launch(): void**  
Launches the bot.

### Context directions and methods
#### **bot methods:**  

`ctx.bot.name: string`  
Get the bot token.

`ctx.bot.botName: string`  
Get the name of the bot. It is obtained by a request to the server when the bot is initialized.

`ctx.bot.username: string`
Get the (unique) bot username. Received by a request to the server when the bot is initialized.

`ctx.bot.tags: string[]`  
Tags that group the bot. Received by a request to the server during bot initialization. 

#### **scene methods:**  
`ctx.scene.name: string | undefined`  
Get the name of the scene.

`ctx.scene.enter: (scene: string) => void`  
Enter another scene (can be from any other scene).

`ctx.scene.reenter: () => void`  
Restart a specific scene.  

#### **message methods:**  
`ctx.message.date: Date`  
The date the message was created.

`ctx.message.chat: string;`  
The chat id in which the message was received (can be the chat id with the user).

`ctx.message.message_id: string`  
The id of the received message.

`ctx.message.from: string`  
Id of the user from whom the message came.

`ctx.message.text: string`  
The text of the received message.

#### **Other directions:**  
`ctx.reply (text: string) => void`  
Send a message to the user from whom the message came.
## Usage/Examples

Here's a quick example to get you started:

```javascript
// Import the SnapsterBot class from the library
import { SnapsterBot } from "snapster-bot"

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
```


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

## License

This project is licensed under the terms of the [MIT License](https://choosealicense.com/licenses/mit/) - see LICENSE.md for details.