const db = require("../../models");
const User = db.user;
const Department = db.department
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt')

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

    let hash = bcrypt.hashSync(req.body.password, 10);

    User.findOne({
        where: { username: req.body.username},
        include: [{
            model: Department
        }]
    })
    .then(user => {
        if(user) {
            if(user.active) {
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    let deptId = null
                    if (user.department) {
                        deptId = user.department.id
                    }
                    const userData = {
                        id: user.id,
                        username: user.username,
                        fullname: user.fullName,
                        role: user.role,
                        departmentId: deptId
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
            } else {
                res.status(403).send({
                    message: "Account is not active!"
                });
            }
        } else {
            res.status(403).send({
                message: "Incorrect Credentials!"
            });
        }
    })
};