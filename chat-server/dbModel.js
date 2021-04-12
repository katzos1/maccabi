const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uuid = require('uuid');

//User Schema
const userSchema = new Schema(
    {
        nickName: { type: String },
        userName: { type: String, index: true, unique: true },
        password: String,
        dateCreated: { type: Date, default: () => new Date() },
        token: { type: String, default: () => uuid.v4(), index: true, unique: true },
        isAdmin: { type: Boolean, default: false }
    });


//Room
const roomSchema = new Schema(
    {
        name: String,
        dateCreated: { type: Date, default: Date.now() },
        chats: [{
            messageId: { type: String, default: () => uuid.v4() },
            userId: { type: Schema.Types.ObjectId },
            nickName: { type: String },
            statusMessage: { type: Number, default: 0 },
            message: { type: String },
            sentTime: { type: Date, default: Date.now() },
        }]
    });


//return models
var myModels = {
    User: mongoose.model('User', userSchema, 'users'),
    Room: mongoose.model('Room', roomSchema, 'rooms'),
};
module.exports = myModels;