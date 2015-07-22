var Word = require('mongoose').model('Word');

exports.getWords = function (req, res) {
    Word.find({}).exec(function (err, collection) {
        res.send(collection);
    });
};