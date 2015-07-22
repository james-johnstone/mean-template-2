var User = require('mongoose').model('User'),
    crypto = require('../utilities/crypto');

exports.getUsers = function (req, res) {
    User.find({}).exec(function (err, collection) {
        res.send(collection);
    });
};

exports.getUser = function (req, res) {
    User.findOne({ _id: req.params.id }).exec(function (err, user) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(user);
    });
};

exports.createUser = function (req, res, next) {
    var userData = req.body;
    userData.salt = crypto.createSalt();
    userData.hashedPassword = crypto.hashPassword(userData.password, userData.salt);

    User.create(userData, function (err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Username already registered');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            res.send(user);
        });
    });
};

exports.updateUser = function (req, res) {
    var userData = req.body;
    delete userData._id;

    if (req.user.email !== userData.email && !req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    User.update({ email: userData.email }, { $set: userData }, function (err) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Username already registered');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(req.user);
    });
};