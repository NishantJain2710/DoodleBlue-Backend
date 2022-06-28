import { body } from 'express-validator'

const AuthValidationMiddleware = (type) => {
    if(type === 'register'){
        return[
            body('username')
                .notEmpty()
                .isString()
                .withMessage('Invalid Username'),
            body('password')
                .notEmpty()
                .trim()
                .isLength({min:5, max:30})
                .withMessage('Password must be b/w 5 - 30 characters'),
            body('place')
                .notEmpty()
                .isString()
                .withMessage('Invalid Place'),
            body('latitude')
                .notEmpty()
                .isNumeric()
                .withMessage('Invalid Latitude'),
            body('longitude')
                .notEmpty()
                .isNumeric()
                .withMessage('Invalid Longitude'),
        ];
    }else if(type === 'login'){
        return[
            body('username')
                .notEmpty()
                .isString()
                .withMessage('Invalid Username'),
            body('password')
                .notEmpty()
                .trim()
                .isLength({min:5, max:30})
                .withMessage('Password must be b/w 5 - 30 characters'),
        ]
    } else {
        return [

        ]
    }
}

export default AuthValidationMiddleware;