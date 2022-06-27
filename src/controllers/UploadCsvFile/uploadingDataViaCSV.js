import validationErrorUtils from '../../utils/ValidationErrors.js';
import UserDetails from '../../models/userDetails.js';
import fs from 'fs'
import csv from 'csv-parser';
import * as argon2 from 'argon2';

const uploadCsvFileRecords = async (req, res) => {
    try{
        const errorMsg = 'Invalid Input';
        const valiErr = validationErrorUtils(req, errorMsg);
        if (valiErr !== null) {
            res.status(400).json(valiErr);
            return;
        }

        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', async(data)=>{
                
                const isUserExist = await UserDetails.findOne({
                    username:data.username
                })

                const hashedPass = await argon2.hash(data.password);

                if(!isUserExist){
                    await UserDetails.create({
                        username:data.username,
                        password:hashedPass,
                        place:data.place,
                        latitude:data.latitude,
                        longitude:data.longitude
                    }).save()
                }else{
                    isUserExist.password = hashedPass;
                    isUserExist.place = data.place;
                    isUserExist.latitude = data.latitude;
                    isUserExist.longitude = data.longitude;
                    await isUserExist.save()
                }
            })
            .on('end', ()=>{
                res.status(200).json([
                    {
                        data:null,
                        message:'data uploaded'
                    }
                ])
            })

    }catch(error){
        res.status(500).json([
            {
                message:error.message,
                location:'./controller/UploadCsvFile/uploadDataViaCSV.js',
                errorType:'TryCatch'
            }
        ])
    }
}

export default uploadCsvFileRecords;