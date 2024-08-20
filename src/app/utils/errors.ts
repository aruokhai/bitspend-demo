export class AuthenticationError extends Error {
    readonly action: string = "";
    constructor(cause: string, message: string, action: string) {
        super(message);
        this.name = 'AuthenticationError';
        this.cause = cause;
        this.action = action;

    }
}