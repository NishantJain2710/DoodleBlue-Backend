import { app } from './app.js';
import  startup  from './utils/serverConnection.js';

const startfun = startup;
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    if(process.env.NODE_ENV === 'dev'){
        startfun(5);
    }else{
        startfun(5);
    }
})