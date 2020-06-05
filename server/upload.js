const multer = require("multer")

const imageOrPdfFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("image") || file.mimetype.startsWith("pdf")) {
        cb(null, true)
    } else {
        cb("Please upload only images.", false)
    }
}

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-bezkoder-${file.originalname}`)
    }
})

var uploadFile = multer({storage: storage, fileFilter: imageOrPdfFilter })
module.exports = uploadFile;