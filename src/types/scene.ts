import SceneManager from "../scenes/SceneManager";
import SessionManager from "../session/SessionManager";
import { EActionTypes } from "../utils/enums";
import { ICtx } from "./context";

/**
 * An interface that represents actions for scene triggers.
 */
interface IScenesGeneratorFunction {
    /**
     * Trigger for when a user enters a scene.
     * @param {ICtx} ctx - The bot context.
     */
    enter(ctx: ICtx): void;

    /**
      * Trigger for when a user sends a text message to the bot.
      * @param {ICtx} ctx - The bot context.
      */
    text(ctx: ICtx): void;

    /**
     * Trigger for when a user sends any message to the bot.
     * @param {ICtx} ctx - The bot context.
     */
    message(ctx: ICtx): void;
}

/**
 * Interface representing a scene generator.
 */
interface IScenesGenerator {
    /** Method name calls function. */
    [methodName: string]: IScenesGeneratorFunction
}

/**
 * Interface representing actions for bot context.
 */
interface IScene {
    /**
      * Function that returns the name of the scene.
      * @returns {string} The name of the scene.
      */
    getName: () => string;

    /**
     * Registers a handler for the scene's enter event.
     * @param {function(ICtx): void} handler - The function to execute on scene enter.
     */
    onEnter: (handler: (ctx: ICtx) => void) => void;

    /**
     * Registers a handler for new text messages within the scene.
     * @param {function(ICtx): void} handler - The function to execute on receiving text.
     */
    onText: (handler: (ctx: ICtx) => void) => void;

    /**
    * Registers a handler for any new messages within the scene.
    * @param {function(ICtx): void} handler - The function to execute on receiving a message.
    */
    onMessage: (handler: (ctx: ICtx) => void) => void;

    /**
     * Handles an action based on the user's interaction within the scene.
     * @param {ICtx} ctx - The bot context.
     * @param {EActionTypes} action - The type of action triggered.
     */
    handleAction: (ctx: ICtx, action: EActionTypes) => void;
}

/**
 * Interface for scene context actions available to the developer.
 * Manages scene transitions and interactions within the bot framework.
 */
interface ISceneContext {
    /**
     * The name of the current scene, undefined if no scene is active.
     */
    name: string | undefined;

    /**
     * Function to transition to a new scene.
     * @param {string} scene - The name of the scene to enter.
     */
    enter: (scene: string) => void;

    /**
     * Function to reenter the current scene.
     */
    reenter: () => void;
}

/**
 * Type representing a function that observes and reacts to changes in the scene manager.
 * @param {ICtx} ctx - The bot context.
 * @param {SceneManager} sceneManager - The scene manager handling the current scene.
 * @param {SessionManager} sessionManager - The session manager handling session data.
 */
type ISceneManagerObserver = (ctx: ICtx, sceneManager: SceneManager, sessionManager: SessionManager) => void;

export { IScenesGenerator, IScene, ISceneContext, ISceneManagerObserver }