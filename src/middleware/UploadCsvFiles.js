import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'uploads/');
    },
    filename:(req, file, cb)=>{
        cb(null, `${file.fieldname}-${file.originalname}`);
    }
});

const checkFileType=(file, cb)=>{
    const filetypes = /csv/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if(extname&& mimetype){
        return cb(null,true)
    }else{
        cb('csv only!')
    }
}

const upload = multer({
    storage: storage, 
    limits:{
        fileSize: 1024 * 1024 * 5  //5MB
    },
    fileFilter:(req,file,cb)=>{
        checkFileType(file,cb)
    }
});

export {upload};