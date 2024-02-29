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

/**
 * Interface representing a empty object.
 */
interface IEmptyObject { };

/**
 * Interface representing systmem bot information.
 * Includes botName, username and bot tags. 
 */
interface IGetMeAnswer {
    /** Bot name by bot owner. */
    botName: string;

    /** The uniquie username of a bot. Exapmle "@best1bot" */
    username: string;

    /** Bot tags with information for classification. */
    tags: string[];
}

/**
 * Simple keyboard interface.
 */
interface IKeyboard {
    // type: EKeyboardType,
    /** The type of keyboard. Includes reply or inline. */
    type: EKeyboardType.reply;
}

/**
 * Inline keyboard interface. Extends IKeyboard.
 */
interface IInlineKeyboard extends IKeyboard {
    keyboard: any;
}

/**
 * Reply keyboard interface. Extends IKeyboard.
 */
interface IReplyKeyboard extends IKeyboard {
    /** Specifies whether to hide the keyboard after pressing.  */
    one_time_keyboard?: boolean;

    /** Sets whether to optimize the keyboard for different screens. */
    resize_keyboard?: boolean;

    /** Stylized and normalized keyboard. */
    keyboard: Array<Array<string>>;
}

/**
 * Interface representing a message from the bot to a user.
 */
interface IMessageAddInfoToUser {
    /** Specifies whether the message should be silent. */
    silentMode?: boolean;

    /** Specifies whether to prohibit forwarding or saving the message. */
    protectContent?: boolean;

    /** Indicates the message style, based on the ETextStylingTypesObject enum.
     * @see ETextStylingTypesObject
     */
    stylingType?: ETextStylingTypesObject;

    /**
     * Optional keyboard layout attached to the message.
     * Can be either an inline keyboard or a reply keyboard.
     * @see IInlineKeyboard
     * @see IReplyKeyboard
     */
    keyboard?: IInlineKeyboard | IReplyKeyboard
}

export { IUserMessageToBot, IEmptyObject, IGetMeAnswer, IMessageAddInfoToUser, IReplyKeyboard, IInlineKeyboard }