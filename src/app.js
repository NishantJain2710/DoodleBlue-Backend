import express from 'express'

import cors from 'cors';
import morgan from 'morgan';
import pkg from 'body-parser';
import cookieSession from 'cookie-session';

const { json } = pkg;

//importing controller
import invalidRequest from './controllers/invalidController/invalidRequests.js'

//importing Routes
import csvFileRoutes from './routes/CsvFileRoutes/CsvFileRoutes.js';
import Authentication from './routes/Authentication/Authentication.js';
import IncognitoRoutes from './routes/IncognitoRoutes/IncognitoRoutes.js';
import showAllUsersRoutes from './routes/showAllUsersRoutes/showAllUsersRoutes.js';


const app = express();

//CookieSession
app.use(
    cookieSession({
        name: 'token',
        keys: [process.env.KEY_1, process.env.KEY_2],
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }),
);


//Cors
const allowedOrigins = [
    'http://localhost:3000'
]
const options = {
    origin:allowedOrigins,
    credentials:true
}
app.use(cors(options));

app.use(json());
app.use(morgan('tiny'));


app.use('/admin', csvFileRoutes.router)
app.use('/user', Authentication.router)
app.use('/user', IncognitoRoutes.router)
app.use('/user', showAllUsersRoutes.router)



app.get('/',(_req,res)=>{
    res.status(200).json([
        {
            data:null,
            message:"Welcome To DoodleBlue Task Backend!",
        }
    ])
})

app.all('*', invalidRequest);

export { app };