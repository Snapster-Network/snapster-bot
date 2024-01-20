/**
 * Interface representing a message received by the bot from a user.
 */
interface IUserMessageToBot {
    /** The date and time when the message was sent. */
    date: Date;

    /** The identifier of the chat where the message was sent. */
    chat: string;

    /** The unique identifier of the message. */
    message_id: string;

    /** The identifier of the user who sent the message. */
    from: string;

    /** The text content of the message. */
    text: string;
}

type IEmptyObject = {};


export { IUserMessageToBot, IEmptyObject }