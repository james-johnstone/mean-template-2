var path = require('path'),
    mongoose = require('mongoose');

var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/eto',
        port: process.env.PORT || 3030
    },
    production:{
        rootPath: rootPath,
        db: 'mongodb://localhost/eto',
        port: process.env.PORT || 80
    }   
}