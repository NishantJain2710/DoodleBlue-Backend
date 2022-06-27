import express from 'express';
import uploadCsvFileRecords from '../../controllers/UploadCsvFile/uploadingDataViaCSV.js';
import {upload} from '../../middleware/UploadCsvFiles.js';

const router = express.Router();

router.post('/upload/csv',upload.single('uploadcsv') ,uploadCsvFileRecords)

export default { router };