import { hearMessage } from "../services/hearMessage";
import { sendMessage } from "../services/sendMessage";
import { validateBotToken } from "../utils/validators";
import { hearCommand } from "../services/hearCommand";
import SceneManager from "../scenes/SceneManager";
import { ICtx } from "../types/context";
import { setNewMessageHandler } from "../utils/handlers/defaultHandler";
import { getMe } from "../services/getMe";
import { IMessageAddInfoToUser } from "../types/message";
import SessionManager from "../session/SessionManager";
import getUpdates from "../services/getUpdates";

/**
 * Class representing a SnapsterBot.
 */
class SnapsterBot {
    private botToken: string;
    private getUpdatesTimeout: number;
    private currentSceneManager: SceneManager
    private currentSessionManager: SessionManager
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
        this.currentSessionManager = new SessionManager()
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
            scene: {
                name: undefined,
                enter: () => { },
                reenter: () => { }
            },
            session: {
                currentScene: "",
                isEnterStep: true,

                setCurrentScene: () => { }
            },
            reply: () => false
        }

        this.observerUpdate = this.observerUpdate.bind(this);
        this.currentSceneManager.addObserver(this.observerUpdate);
        this.currentSessionManager.addObserver(this.observerUpdate);
    }

    /**
     * Send a message to a specific chat.
     * @param {string} chatId - The chat ID to send the message to.
     * @param {string} text - The text of the message to send.
     * @returns A promise that resolves when the message is sent.
     */
    public async sendMessage(chatId: string, text: string, addInfo?: IMessageAddInfoToUser) {
        return await sendMessage(this.botToken, chatId, text, addInfo);
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
        if (this.currentSceneManager.isScenesArraySet() && !this.currentSceneManager.getDefaultScene()) throw new Error("Default scene not set")

        const botInfo = await getMe(this.botToken)
        if (!botInfo) throw new Error("Wrong bot token")
        else if (botInfo == "internet_error") throw new Error("Internet error")

        this.publicContext.bot.botName = botInfo.botName
        this.publicContext.bot.username = botInfo.username
        this.publicContext.bot.tags = botInfo.tags

        console.log("Snapster Bot successfully started!")
        getUpdates(this.publicContext, this.currentSessionManager, this.currentSceneManager, this.getUpdatesTimeout)
    }

    // public async sceneEnter(scene: string) {
    //     this.currentSceneManager.sceneEnter(this.publicContext, scene, undefined)
    // }

    public async setDefaultScene(scene: string) {
        this.currentSceneManager.setDefaultScene(this.publicContext, scene, this.currentSessionManager)
    }

    public async setScenes(scenes: any) {
        this.currentSceneManager.setScenesArray(scenes);
    }

    observerUpdate(ctx: ICtx, sceneManager: SceneManager, sessionManager: SessionManager) {
        this.currentSessionManager = sessionManager
        this.currentSceneManager = sceneManager

        const session = sessionManager.getSession(ctx.message.from)
        if (!session) return
        const sceneName = session.getCurrentScene()


        this.publicContext.scene = {
            name: sceneName,
            enter: (sceneName: string) => sceneManager.sceneEnter(ctx, sceneName, sessionManager),
            reenter: () => sceneManager.sceneReenter(ctx, sessionManager),
        };
    }

    onNewMessage(customHandler: (ctx: ICtx) => void) {
        setNewMessageHandler(customHandler)
    }
}

export default SnapsterBot;