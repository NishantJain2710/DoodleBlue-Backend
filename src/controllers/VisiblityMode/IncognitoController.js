import UserDetails from '../../models/userDetails.js';
import validationErrorUtils from '../../utils/ValidationErrors.js';

const IncognitoController = async (req, res) =>{
    try{
        const errorMsg = 'Invalid Input';
        const valiErr = validationErrorUtils(req, errorMsg);
        if (valiErr !== null) {
            res.status(400).json(valiErr);
            return;
        }

        const id = req.headers['id'];
        const isUserExist = await UserDetails.findById(id);

        if(!isUserExist){
            res.status(400).json([
                {
                    message:'User Not Exist',
                    location:'./controller/VisiblityMode/IncognitoController.js',
                    errorType:'User Not Found'
                }
            ])
            return;
        }

        let incognitoMode
        if(isUserExist.incognito === false){
            incognitoMode = true;
        }else{
            incognitoMode = false;
        }

        isUserExist.incognito = incognitoMode
        await isUserExist.save();

        res.status(200).json([
            {
                data: null,
                message: 'successfully change the status',
            },
        ]);

    }catch(error){
        res.status(500).json([
            {
                message:error.message,
                location:'./controller/VisiblityMode/IncognitoController.js',
                errorType:'TryCatch'
            }
        ])
    }
}

export default IncognitoController;