/// <reference path="../controllers/users.js" />
var auth = require('./auth'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    userController = require('../controllers/users');

module.exports = function (app) {

    app.get('/api/users', auth.requiresRole('admin'), userController.getUsers);
    app.post('/api/users', userController.createUser);
    app.put('/api/users', userController.updateUser);

    app.get('/api/users/:id', auth.requiresRole('admin'), userController.getUser);

    app.get('/partials/*', function (req, res) {
        res.render('partials/' + req.params);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.all('/api/*', function (req, res) {
        res.send(404);
    });

    app.get('*', function (req, res) {
        res.render('index', {
            currentUser: req.user
        });
    });
}