type ReplyKeyboardInput = string | number | Array<string | number> | Array<Array<string | number>>;

function createReplyKeyboard(input: ReplyKeyboardInput): Array<Array<string>> | undefined {
    if (typeof input === 'string' || typeof input === 'number') {
        return [[input.toString()]];
    } else if (Array.isArray(input)) {
        if (input.length === 0) {
            return [[]];
        } else if (typeof input[0] === 'string' || typeof input[0] === 'number') {
            return [input.map(item => item.toString())];
        } else if (Array.isArray(input[0])) {
            return input.reduce((acc: Array<Array<string>>, subArray) => {
                if (Array.isArray(subArray)) {
                    acc.push(subArray.map(item => item.toString()));
                }
                return acc;
            }, []);
        }
    }
    return undefined
}

function createInlineKeyboard(input:any){
    input
}

export { createReplyKeyboard, createInlineKeyboard }