type ReplyKeyboardInput = string | number | Array<ReplyKeyboardInput>;

/**
 * Stylizes the reply keyboard to simplify work.
 * @param {ReplyKeyboardInput} input - The keyboard object.
 * @returns {Array<Array<string>>} - Stylized and normalized keyboard.
 */
function createReplyKeyboard(input: ReplyKeyboardInput): Array<Array<string>> {
    function flatten(input: ReplyKeyboardInput): Array<string> {
        if (typeof input === 'string' || typeof input === 'number') {
            return [input.toString()];
        } else if (Array.isArray(input)) {
            return input.reduce((acc: Array<string>, item) => {
                return acc.concat(flatten(item)); // Use concat to merge arrays
            }, []);
        } else {
            console.error("Keyboard error");
            return [];
        }
    }

    if (Array.isArray(input) && input.length > 0 && Array.isArray(input[0])) {
        // Process each sub-array separately to maintain structure
        return input.map(subInput => flatten(subInput));
    } else {
        // Process as a single row
        return [flatten(input)];
    }
}



function createInlineKeyboard(input: any) {
    input
}

export { createReplyKeyboard, createInlineKeyboard }