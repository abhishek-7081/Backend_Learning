import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
        // cb(null, file.originalname + "@at_load")
    }
})

export const upload = multer({
    storage
})