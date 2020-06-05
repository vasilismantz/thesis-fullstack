const fs = require("fs");

const db = require("../models")
const Image = db.images;

const uploadFiles = async (req, res) => {
    try {
        console.log(req.body.file)
        
        if(req.file === undefined) {
            return res.status('403').send({
                message: 'You must selcet a file'
            })
        }

        Image.create({
            type: req.file.mimetype,
            name:req.file.originalname,
            data: fs.readFileSync(
                __basedir + "/public/uploads" + req.file.filename
            )
        }).then(res => {
            return res.status(200).send()
        })
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            message: `Error when trying to upload files: ${error}`
        })
    }
}

module.exports = {
    uploadFiles
}