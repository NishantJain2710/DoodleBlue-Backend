import jwt from 'jsonwebtoken';

const isAuthentication = async (req, res, next) => {
    const atoken = req.headers['authorization'];
    if(atoken){
        try{
            const payload = await jwt.verify(atoken, process.env.JWT_TOKEN);
            req.headers['id'] = payload.id;
            req.headers['username'] = payload.username;
            return next();

        }catch(error){
            res.status(401).json([
                {
                    errorType: 'Unauthorized',
                    location: 'Auth Verification middleware',
                    message: 'User is not authenticated, try logging in again...',
                },
            ]);
            return;
        }
    }else{
        res.status(401).json([
            {
                errorType: 'Unauthorized',
                location: 'Auth Verification middleware',
                message: 'User is not authenticated, try logging in again...',
            },
        ]);
        return;
    }
}

export  { isAuthentication }