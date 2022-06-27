import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config();

const connection = {
    async create(){
        console.log('-------------');
        console.log(process.env.NODE_ENV);
        console.log(process.env.DB_USERNAME);
        console.log(process.env.DB_PASSWORD);
        console.log('-------------');
        
        mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@doodleblue.qalzr.mongodb.net/?retryWrites=true&w=majority`)
    },

    async close(){
        await mongoose.connection.close()
    }
} 

export default connection