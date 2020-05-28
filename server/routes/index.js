var express = require('express');
var router = express.Router();

var withAuth = require('../withAuth')

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.status(404).send({message: "Navigate to /api for documentation"})
});

router.get('/checkToken', withAuth.checkToken)

module.exports = router;
