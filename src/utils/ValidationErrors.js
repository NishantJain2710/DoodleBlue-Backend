import { validationResult } from 'express-validator';

const validationErrorUtils = (req, message) => {
    const valiErrors = validationResult(req);

    if(!valiErrors.isEmpty()){
        const customError = [];

        valiErrors.array().forEach(error => {
            customError.push({
                errorType: message,
                location: error.param,
                message: error.msg
            })
        })

        return customError;
    } else {
        return null;
    }
}

export default validationErrorUtils