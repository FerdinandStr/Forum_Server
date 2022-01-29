const BAD_REQUEST = 400
const UNAUTHORIZED = 401
const NOT_FOUND = 404

class CustomError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        this.custom = true
    }
}

export class NotFoundError extends CustomError {
    constructor(message) {
        super(message)
        this.code = NOT_FOUND
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message)
        this.code = UNAUTHORIZED
    }
}

export class BadRequestError extends CustomError {
    constructor(message) {
        super(message)
        this.code = BAD_REQUEST
    }
}
