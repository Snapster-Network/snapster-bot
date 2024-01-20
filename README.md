Snapster Bot Library
Description
Snapster Bot Library is a Node.js library designed for creating and managing bots on the Snapster platform. This library simplifies the interaction with the Snapster API, allowing developers to easily send messages, handle commands, and manage long polling updates.

Features
Send and receive messages.
Handle custom commands.
Manage long polling connections to Snapster API.
Error handling and reconnection strategies.
Installation
To install the library, run the following command:

npm install snapster-bot-js
Usage
Here's a quick example to get you started:

const SnapsterBot = require('snapster-bot-js');

const bot = new SnapsterBot('<YOUR_TOKEN>');

// Send a message
bot.sendMessage('<CHAT_ID>', 'Hello, World!');

// Listen for a message
bot.hearMessage('Hi, bot #1', (message) => {
    console.log('Hello!:', message);
});

// Listen for a command
bot.hearCommand('/start', (message) => {
    console.log('Start command received:', message);
});

// Start receiving updates
bot.getUpdates();
API Reference
SnapsterBot(token: string)
Constructor to create a new bot instance.

sendMessage(chatId: string, text: string): Promise<void>
Send a message to a specific chat.

hearMessage(message: string, handler: Function): void
Set a handler for a specific message up to 4096 symbols.

hearCommand(command: string, handler: Function): void
Set a handler for a specific command.

getUpdates(): void
Starts the long polling mechanism to listen for new messages.

Contributing
Contributions to the Snapster Bot Library are welcome! Please refer to the CONTRIBUTING.md file for guidelines.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.