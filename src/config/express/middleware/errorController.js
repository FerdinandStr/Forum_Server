function errorController(err, req, res, next) {
    console.log("this is the error middleware!")
    console.log(err.name, err.code, err.message)

    //hande PostgreSQL Duplicate Key Error
    if (err.code && err.code == 23505) {
        return handleDuplicateKeyError(err, res)
    }
    if (err.name == "ValidationError") {
        return handleValidationError(err, res)
    }
    tryHandleUnknown(err, res)

    const code = err.custom ? err.code : 500

    return res.status(code).send({ error: err.message || "ERROCONTROLLER LAST RESORT 500" })
}

function handleDuplicateKeyError(err, res) {
    const errCode = 409 //Conflict
    const message = err.detail || "detail missing; ERROR !!!"
    // console.log({ messages: message, fields: field })
    res.status(errCode).send({ error: "Duplicate Key Error: " + message }) //, messages: [], fields: []
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
