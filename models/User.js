// Require Mongoose
const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // using REGEX to validate correct email
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
)

// Retrieve the length of user's friends array
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

// create the User model using UserSchema
const User = model('User', UserSchema);

// Export User module
module.exports = User;