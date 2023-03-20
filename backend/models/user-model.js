const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isEmailActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    isUserActive: {type: Boolean, default: true}
})

module.exports = model('User', UserSchema);