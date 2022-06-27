import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import validationErrorUtils from '../../utils/ValidationErrors.js';
import UserDetails from '../../models/userDetails.js';

const loginController = async(req, res) => {
    try{
        const errorMsg = 'Invalid Input';
        const valiErr = validationErrorUtils(req, errorMsg);
        if (valiErr !== null) {
            res.status(400).json(valiErr);
            return;
        }

        const { username, password } = req.body;

        const isUserExist = await UserDetails.findOne({ username });
        if(!isUserExist){
            res.status(400).json([
                {
                    message:'Incorrect Username',
                    location:'./controllers/Authentication/LoginController.js',
                    errorType:'username not found'
                }
            ])
            return;
        }

        const verifyPassword = await argon2.verify(isUserExist.password, password);
        if(!verifyPassword){
            res.status(400).json([
                {
                    message:'Incorrect Password',
                    location:'./controllers/Authentication/LoginController.js',
                    errorType:'Incorrect Password'
                }
            ])
            return;
        }

        const payload = {
            id:isUserExist._id,
            username:isUserExist.username
        }

        const token = await jwt.sign(payload, process.env.JWT_TOKEN, {
            expiresIn: 60*60*24*7
        })

        res.status(200).json([
            {
                data:{
                    authToken:token
                },
                message:'user login successfully'
            }
        ])
    }catch(error){
        res.status(500).json([
            {
                message:error.message,
                location:'./controllers/Authentication/LoginController.js',
                errorType:'TryCatch'
            }
        ])
    }
}

export default loginController;