import { terminal } from 'terminal-kit';

process.env.TERM = '';
const on = process.env.stage !== 'prod';

let lastTime;

export default {
    debug: (...args) => writeLog(args, 'debug'),
    log: (...args) => writeLog(args, 'log'),
    info: (...args) => writeLog(args, 'info'),
    success: (...args) => writeLog(args, 'success'),
    error: (...args) => writeLog(args, 'error'),
    warn: (...args) => writeLog(args, 'warn'),
    chainDebug: (...args) => data => {
        writeLog(args, 'debug');
        return Promise.resolve(data);
    },
    chainLog: (...args) => data => {
        writeLog(args, 'log');
        return Promise.resolve(data);
    },
    chainInfo: (...args) => data => {
        writeLog(args, 'info');
        return Promise.resolve(data);
    },
    chainSuccess: (...args) => data => {
        writeLog(args, 'success');
        return Promise.resolve(data);
    },
    chainError: (...args) => data => {
        writeLog(args, 'error');
        return Promise.resolve(data);
    },
    chainWarn: (...args) => data => {
        writeLog(args, 'warn');
        return Promise.resolve(data);
    }
};

function writeLog(args, type) {
    let bg;
    let fg = 'white';
    switch (type) {
        case 'debug':
            bg = 'bgMagenta';
            break;
        case 'log':
            bg = 'bgBlue';
            break;
        case 'info':
            bg = 'bgBlack';
            break;
        case 'success':
            bg = 'bgGreen';
            break;
        case 'error':
            bg = 'bgRed';
            break;
        case 'warn':
            bg = 'bgYellow';
            fg = 'black';
            break;
        default:
            bg = 'bgBlue';
            break;
    }
    const date = new Date();
    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
    
    if (on) terminal[bg][fg](
        `Streame ${type} - ${dateString} (+${Date.now() - (lastTime || Date.now())}ms) $ ${format(args, args.length)}`
    );
    lastTime = Date.now();
}

function format(args, length) {
    let output = '';
    args.forEach((item, index) => {
        let type = getType(item);
        let indentation = length > 1 || type === 'object' || type === 'array' ? 2 : 0;
        if (length > 1) output += `\n log ${index + 1}: `;
        output += `(${type}) ${JSON.stringify(item, null, indentation)}\n`;
    });
    return output;
}

function getType(variable) {
    if (variable === null) return 'null';
    if (variable instanceof Array) return 'array';
    return typeof variable;
}