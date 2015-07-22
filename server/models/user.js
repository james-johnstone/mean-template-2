var mongoose = require('mongoose'),
    crypto = require('../utilities/crypto');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: { type: String, required: '{PATH} is required', unique: true },
    email: { type: String, required: '{PATH} is required', lowercase: true, trim: true, unique: true },
    salt: String,
    hashedPassword: { type: String, required: 'Password is required' },
    roles: [String]
});

userSchema.methods = {
    authenticate: function (password) {
        return crypto.hashPassword(password, this.salt) === this.hashedPassword;
    },
    hasRole: function (role) {
        return this.roles.indexOf(role) > -1;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = crypto.createSalt();
            hash = crypto.hashPassword('test', salt);

            User.create({ email: 'admin@uat.co', firstName: 'Jamie', lastName: 'Johnstone', userName: 'Jamie', salt: salt, hashedPassword: hash, roles: ["admin"] });
            User.create({ email: 'user@uat.co', firstName: 'Dr', lastName: 'Doom', userName: 'Doc', salt: salt, hashedPassword: hash, });
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;