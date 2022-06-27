import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import validationErrorUtils from '../../utils/ValidationErrors.js';
import UserDetails from '../../models/userDetails.js';

const RegisterController = async(req, res) => {
    try{
        const errorMsg = 'Invalid Input';
        const valiErr = validationErrorUtils(req, errorMsg);
        if (valiErr !== null) {
            res.status(400).json(valiErr);
            return;
        }

        const { username, password, place, latitude, longitude } = req.body;
        const isUserExist = await UserDetails.findOne({ username });

        if(isUserExist){
            res.status(400).json([
                {
                    message:'User Already Exist',
                    location:'./controllers/Authentication/RegisterController.js',
                    errorType:'User Found'
                }
            ])
            return;
        }

        const hashedPass = await argon2.hash(password);

        const user = await UserDetails.create({
            username:username,
            password:hashedPass,
            place:place,
            latitude:latitude,
            longitude:longitude
        })

        const payload = {
            id:user._id,
            username:user.username
        }

        const token = await jwt.sign(payload, process.env.JWT_TOKEN, {
            expiresIn: 60*60*24*7
        })

        res.status(200).json([
            {
                data:{
                    authToken:token
                },
                message:'user register successfully'
            }
        ])


    }catch(error){
        res.status(500).json([
            {
                message:error.message,
                location:'./controllers/Authentication/RegisterController.js',
                errorType:'TryCatch'
            }
        ])
    }
}
export default RegisterController;