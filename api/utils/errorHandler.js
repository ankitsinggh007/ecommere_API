class ErrorHandler extends Error{
    constructor(message,StatusCode){
        super(message);
        this.statusCode = StatusCode;
        Error.captureStackTrace(this,constructor);
    }
}

module.exports = ErrorHandler;