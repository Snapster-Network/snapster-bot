/**
 * Enum for action types used in bot interactions.
 * Defines the types of actions that can be triggered.
 */
enum EActionTypes {
    /** Represents a text action, usually involving sending or receiving text. */
    text = "text",

    /** Represents a message action, typically related to message processing. */
    message = "message",

    /** Represents an enter action, used for entering into a new state or context. */
    enter = "enter"
}

/**
 * Enum for text styling types in bot messages.
 * Specifies how the text in a message should be formatted.
 */
enum ETextStylingTypesObject {
    /** No special styling for the text. */
    none = "none",

    /** Text is formatted using Markdown syntax. */
    markdown = "markdown"
}

/**
 * Enum for keyboard types in bot interfaces.
 * Defines the types of keyboards that can be used in bot interactions.
 */
enum EKeyboardType {
    /** A reply keyboard that replaces the native keyboard in the chat interface. */
    reply = "reply",

    /** An inline keyboard that appears directly in the message with which it is associated. */
    inline = "inline"
}

export { EActionTypes, ETextStylingTypesObject, EKeyboardType }