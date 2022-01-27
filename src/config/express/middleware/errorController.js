function errorController(err, req, res, next) {
    console.log("this is the error middleware!")
    console.log(err.name, err.code, err.message)

    if (err.code && err.code == 11000) {
        return handleDuplicateKeyError(err, res)
    }
    if (err.name == "ValidationError") {
        return handleValidationError(err, res)
    }
    tryHandleUnknown(err, res)

    return res.status(500).send({ error: err.message || "ERROCONTROLLER LAST RESORT 500" })
}

function handleDuplicateKeyError(err, res) {
    const errCode = 409 //Conflict
    const field = Object.keys(err.keyValue)
    const message = `An account with that ${field} already exists.`
    console.log({ messages: message, fields: field })
    res.status(errCode).send({ error: "Duplicate Key Error: " + message, messages: [message], fields: [field] })
}

function handleValidationError(err, res) {
    const code = 400
    const messages = Object.values(err.errors).map((el) => el.message)
    const fields = Object.values(err.errors).map((el) => el.path)
    console.log({ messages: messages, fields })
    return res.status(code).send({ error: "Validation Error", messages: messages, fields: fields })
}

function tryHandleUnknown(err, res) {
    try {
        console.log("Fields:", Object.keys(err.keyValue))
    } catch (e) {
        // console.log(e)
    }
    try {
        console.log(Object.values(err.errors).map((el) => el.message))
    } catch (e) {
        // console.log(e)
    }
    try {
        console.log(Object.values(err.errors).map((el) => el.path))
    } catch (e) {
        // console.log(e)
    }
    try {
    } catch (e) {}
}

export default errorController
