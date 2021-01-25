const jwt = require('jsonwebtoken')
const db = require("./models");
const User = db.user;

exports.checkToken = (req, res) => {
    //Get auth header value
    const bearerHeader = req.headers['authorization']; 
    
    //Check if undefined
    if(typeof bearerHeader !== 'undefined') {
        //Split at the space
        const bearer = bearerHeader.split(' ');
        
        //Get token from array
        const bearerToken = bearer[1];

        //Set the token
        req.token = bearerToken;

        jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
            if(err) {
                res.status(403).send({message: 'Access denied: Wrong access token'});
            } else {
                res.status(201).send({message: 'Access granted!', authData});
            }
        })
    } else {
        res.status(401).send({message: 'Access denied: No token provided'});
    }
}

exports.verifyToken = (req, res, next) => {
    //Get auth header value
    const bearerHeader = req.headers['authorization']; 

    //Check if undefined
    if(typeof bearerHeader !== 'undefined') {
        //Split at the space
        const bearer = bearerHeader.split(' ');
        
        //Get token from array
        const bearerToken = bearer[1];

        //Set the token
        req.token = bearerToken;

        jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
            if(err) {
                res.status(403).send({message: 'Access denied: Wrong access token'});
            } else {
                req.authData = authData;
                next();
            }
        })
    } else {
        res.status(401).send({message: 'Access denied: No token provided'});
    }
}

exports.withRoleAdmin = (req, res, next) => {
    var authData = req.authData;

    User.findOne({
        where: {id: authData.user.id}
    })
    .then(user => {
        if(user) {
            if(user.role === "ROLE_ADMIN") {
                req.authData = authData;
                next()
            } else {
                res.status(401).send({message: "Access denied: Role can't access this api"})
            }
        } else {
            res.status(401).send({message: "Forbidden"})
        }
    })
}

exports.withRoleAdminOrManager = (req, res, next) => {
    var authData = req.authData;

    User.findOne({
        where: {id: authData.user.id}
    })
    .then(user => {
        if(user) {
            if(user.role === "ROLE_ADMIN" || user.role === "ROLE_MANAGER") {
                req.authData = authData;
                next()
            } else {
                res.status(401).send({message: "Access denied: Role can't access this api"})
            }
        } else {
            res.status(401).send({message: "Forbidden"})
        }
    })
}

exports.withRoleManager = (req, res, next) => {
    var authData = req.authData;

    User.findOne({
        where: {id: authData.user.id}
    })
    .then(user => {
        if(user) {
            if(user.role === "ROLE_MANAGER") {
                req.authData = authData;
                next()
            } else {
                res.status(401).send({message: "Access denied: Role can't access this api"})
            }
        } else {
            res.status(401).send({message: "Forbidden"})
        }
    })
}

exports.withRoleEmployee = (req, res, next) => {
    var authData = req.authData;

    User.findOne({
        where: {id: authData.user.id}
    })
    .then(user => {
        if(user) {
            if(user.role === "ROLE_EMPLOYEE") {
                req.authData = authData;
                next()
            } else {
                res.status(401).send({message: "Access denied: Role can't access this api"})
            }
        } else {
            res.status(401).send({message: "Forbidden"})
        }
    })
}