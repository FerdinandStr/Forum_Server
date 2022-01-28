const NOT_FOUND = 404

class CustomError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        this.custom = true
    }
}

class NotFoundError extends CustomError {
    constructor(message) {
        super(message)
        this.code = NOT_FOUND
    }
}

export { NotFoundError }
