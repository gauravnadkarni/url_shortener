'use strict';
const winston = require('winston');
const fs = require('fs');
const path = require('path');
let config = require('../config');

const env = config.app.ENV;
const logPath = config.app.LOG_PATH;
const logFile = config.app.LOG_FILE;

let filePath = path.join(logPath, logFile);
if (!fs.existsSync(filePath)) {
    throw new Error('No log file found');
}

let options = {
    file: {
        level: env === 'production' ? 'info' : 'debug',
        filename: filePath,
        handleExceptions: true,
        json: false,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: env === 'production' ? 'info' : 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

//let transports = [ new winston.transports.File(options.file)];
let transports = [];
//if(env === 'local') {
transports.push(new winston.transports.Console(options.console));
//}

const logger = winston.createLogger({
    transports: transports,
    exitOnError: false,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function (message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};

module.exports = logger;

