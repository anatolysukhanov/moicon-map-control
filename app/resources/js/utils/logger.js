class Logger {
    static log(message, obj) {
        if (!framework.config.debug) {
            return;
        }
        if (typeof obj !== undefined) {
            console.log(message, obj);
        } else {
            console.log(message);
        }
    }

    static error(message, obj) {
        if (typeof obj !== undefined) {
            console.error(message, obj);
        } else {
            console.error(message);
        }
    }
}
