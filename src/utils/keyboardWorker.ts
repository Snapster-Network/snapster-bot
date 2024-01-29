type ReplyKeyboardInput = string | number | Array<string | number> | Array<Array<string | number>>;

/**
 * Stylizes the reply keyboard to simplify work.
 * @param {ReplyKeyboardInput} input - The keyboard object.
 * @returns {Array<Array<string>>} - Stylized and normalized keyboard.
 */
function createReplyKeyboard(input: ReplyKeyboardInput): Array<Array<string>> {
    if (typeof input === 'string' || typeof input === 'number') {
        return [[input.toString()]];
    } else if (Array.isArray(input)) {
        if (input.length === 0) {
            console.error("Keyboard error")
            return [[]];
        } else if (typeof input[0] === 'string' || typeof input[0] === 'number') {
            return [input.map(item => item.toString())];
        } else if (Array.isArray(input[0])) {
            return input.reduce((acc: Array<Array<string>>, subArray) => {
                if (Array.isArray(subArray)) {
                    acc.push(subArray.map(item => item.toString()));
                } else {
                    console.error("Keyboard error")
                    return [[]];
                }
                return acc;
            }, []);
        } else {
            console.error("Keyboard error")
            return [[]];
        }
    } else {
        console.error("Keyboard error")
        return [[]];
    }
}


function createInlineKeyboard(input: any) {
    input
}

export { createReplyKeyboard, createInlineKeyboard }