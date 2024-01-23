import { EKeyboardType, ETextStylingTypesObject } from "../utils/enums";

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

interface IEmptyObject { };

interface IGetMeAnswer {
    botName: string;
    username: string;
    tags: string[];
}


interface IKeyboard {
    // type: EKeyboardType,
    type: EKeyboardType.reply,
}

interface IInlineKeyboard extends IKeyboard {
    keyboard: any;
}

interface IReplyKeyboard extends IKeyboard {
    one_time_keyboard?: boolean;
    resize_keyboard?: boolean;
    keyboard: any;
}

interface IMessageAddInfoToUser {
    silentMode?: boolean;
    protectContent?: boolean;
    stylingType?: ETextStylingTypesObject;
    keyboard?: IInlineKeyboard | IReplyKeyboard
}

export { IUserMessageToBot, IEmptyObject, IGetMeAnswer, IMessageAddInfoToUser, IReplyKeyboard, IInlineKeyboard }