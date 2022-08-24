const winston = require("winston");

module.exports = function (){
    winston.add(new winston.transports.File({
        filename: "./src/log/info.log",
        level: "info"
    }));
    winston.add(new winston.transports.File({
        filename: "./src/log/error.log",
        level: "error",
        handleExceptions: true,
        handleRejections: true
    }));
}

