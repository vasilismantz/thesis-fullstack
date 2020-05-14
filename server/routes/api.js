var express = require('express');
var router = express.Router();

var organizationRouter = require('./organization.routes')
var userRouter = require('./user.routes')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('this is the index for api')
});

router.use('/organization', organizationRouter)
router.use('/user', userRouter)

module.exports = router;
