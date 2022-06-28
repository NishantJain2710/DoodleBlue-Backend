import { param } from 'express-validator'

const UserDetailsValidation = (type) => {
    if(type === 'showNearByUsers'){
        return[
            param('dis')
                .notEmpty()
                .isNumeric()
                .withMessage('Invaid distance')
        ];
    }else {
        return [

        ]
    }
}

export default UserDetailsValidation;