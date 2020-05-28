const db = require("../../models");
const User = db.user;
const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken')

// Login
exports.authenticate = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    var userObj = {
        username:req.body.username,
        //TO DO
        //bcryptjs
        password:req.body.password
    }

    User.findOne({where: {
        username: userObj.username,
        password: userObj.password
    }})
    .then(user => {
        if(user) {
            const userData = {
                id: user.id,
                username: user.username,
                fullname: user.fullName,
                role: user.role
            }
            jwt.sign({user: userData}, process.env.SECRET_KEY, { expiresIn: '30m' }, (err, token) => {
                res.cookie('token', token)
                res.status(200).send({
                    token: token
                });
            })
        } else {
            res.status(403).send({
                message: "Incorrect Credentials!"
            });
        }
    })
};