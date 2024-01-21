import { hearMessage } from "../services/hearMessage";
import { sendMessage } from "../services/sendMessage";
import { validateBotToken } from "../utils/validators";
import { getUpdates } from "../services/getUpdates";
import { hearCommand } from "../services/hearCommand";
import SceneManager from "../scenes/SceneManager";
import { ICtx } from "../types/context";
import { ISceneManagerObserver } from "../types/scene";
import { setNewMessageHandler } from "../utils/handlers/defaultHandler";
import { getMe } from "../services/getMe";

/**
 * Class representing a SnapsterBot.
 */
class SnapsterBot implements ISceneManagerObserver {
    private botToken: string;
    private getUpdatesTimeout: number;
    private currentSceneManager: SceneManager
    private publicContext: ICtx

    /**
     * Create a SnapsterBot.
     * @param {string} token - The token for the bot.
     * @param {number} [timeout=100] - The timeout for getting updates in seconds. Must be between 10 and 100.
     * @throws Will throw an error if the bot token format is wrong or the timeout is outside the allowed range.
     */
    constructor(token: string, timeout: number = 100) {
        if (!validateBotToken(token)) throw new Error('wrong bot token format')
        this.botToken = token;

        if (timeout < 10 || timeout > 100) throw new Error('update timeout should be between 10 and 100')
        this.getUpdatesTimeout = timeout

        this.currentSceneManager = new SceneManager()
        this.publicContext = {
            bot: {
                token,
                botName: "",
                username: "",
                tags: []
            },
            message: {
                date: new Date(),
                chat: "",
                message_id: "",
                from: '',
                text: ""
            },
            reply: () => false
        }

        this.observerUpdate = this.observerUpdate.bind(this);
        this.currentSceneManager.addObserver(this.observerUpdate);
    }

    /**
     * Send a message to a specific chat.
     * @param {string} chatId - The chat ID to send the message to.
     * @param {string} text - The text of the message to send.
     * @returns A promise that resolves when the message is sent.
     */
    public async sendMessage(chatId: string, text: string) {
        return await sendMessage(this.botToken, chatId, text);
    }

    /**
     * Set a custom handler for a specific message text.
     * @param {string} text - The text to listen for.
     * @param {(message: string) => Promise<any>} customHandler - The custom handler to execute when the text is received.
     * @returns A promise that resolves when the handler is set.
     */
    public async hearMessage(text: string, customHandler: (ctx: ICtx) => void) {
        return hearMessage(text, customHandler);
    }

    /**
     * Set a custom handler for a specific command.
     * @param {string} text - The command text to listen for (e.g., "/start").
     * @param {(message: string) => Promise<any>} customHandler - The custom handler to execute when the command is received.
     * @returns A promise that resolves when the handler is set.
     */
    public async hearCommand(text: string, customHandler: (ctx: ICtx) => void) {
        return hearCommand(text, customHandler);
    }

    public async launch() {
        const botInfo = await getMe(this.botToken)
        if (!botInfo) throw new Error("Wrong bot token")

        this.publicContext.bot.botName = botInfo.botName
        this.publicContext.bot.username = botInfo.username
        this.publicContext.bot.tags = botInfo.tags

        console.log("Snapster Bot successfully started!")
        getUpdates(this.publicContext, this.getUpdatesTimeout, this.currentSceneManager)
    }

    public async sceneEnter(scene: string) {
        this.currentSceneManager.sceneEnter(scene)
    }

    public async setScenes(scenes: any) {
        this.currentSceneManager.setScenesArray(scenes);
    }

    observerUpdate(sceneManager: SceneManager) {
        const currentSceneName = sceneManager.getCurrentSceneName();

        this.publicContext.scene = {
            name: currentSceneName,
            enter: sceneManager.sceneEnter.bind(sceneManager),
            reenter: sceneManager.sceneReenter.bind(sceneManager),
        };
    }

    onNewMessage(customHandler: (ctx: ICtx) => void) {
        setNewMessageHandler(customHandler)
    }
}

export default SnapsterBot;