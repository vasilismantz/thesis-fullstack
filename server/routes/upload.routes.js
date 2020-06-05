const express = require('express')
const router = express.Router()

const uploadMiddleware = require('../upload')
const withAuth = require('../withAuth')

const uploadController = require('../controllers/upload.controller')

router.post('/', uploadMiddleware.single('file'), withAuth.verifyToken, withAuth.withRoleAdminOrManager, uploadController.uploadFiles)

module.exports = router