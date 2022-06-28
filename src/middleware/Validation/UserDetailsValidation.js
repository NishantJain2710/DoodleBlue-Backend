import { param } from 'express-validator'

const UserDetailsValidation = (type) => {
    if(type === 'showNearByUsers'){
        return[
            param('dis')
                .notEmpty()
                .isNumeric()
                .withMessage('Invaid distance')
        ];
    }else if(type === 'searchByGeo') {
        return [
            param('lon')
                .notEmpty()
                .isNumeric()
                .withMessage('Invaid Longitude'),
            param('lat')
                .notEmpty()
                .isNumeric()
                .withMessage('Invaid Latitude')
        ]
    }else{
        return [

        ]
    }
}

export default UserDetailsValidation;