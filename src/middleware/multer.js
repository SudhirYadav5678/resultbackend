import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
        console.log(file.originalname);

    }
})

export const upload = multer({ storage: storage })

// import multer from "multer";

// const storage = multer.memoryStorage();
// export const singleUpload = multer({ storage }).single("file");