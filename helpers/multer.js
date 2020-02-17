const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === "image/ico" || file.mimetype === "image/jpg") {
        cb(null, true)
    } else {
        cb({
            error: 'please choose jpeg/png format'
        }, false)
    }
}
const upload = multer({
    storage: storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

module.exports = upload;