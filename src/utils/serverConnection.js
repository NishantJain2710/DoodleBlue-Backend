import connection from './mongooseConnection.js';
import dotenv from 'dotenv'
dotenv.config();

const startUp = async(retries)=>{
    while(retries){
        try{
            await connection.create();
            console.log('-------------------');
            console.log('MongoDB connected');
            console.log('-------------------');
            console.log(`Server started at PORT ${process.env.PORT}`);
            break;
        }catch(err){
            retries -=1;
            console.log(`retries left: ${retries}`);
        }
    }
}

export default startUp