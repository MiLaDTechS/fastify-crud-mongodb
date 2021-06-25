const yupOptions = {
    strict: false,
    abortEarly: false,
    stripUnknown: true,
    recursive: true
}

const yupValidationCompiler = ({ schema }) => {
    return function (data) {
        try {
            const result = schema.validateSync(data, yupOptions)
            return { value: result }
        } catch (e) {
            return { error: e }
        }
    }
}

module.exports = {
    yupValidationCompiler
}