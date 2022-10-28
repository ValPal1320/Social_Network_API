// Require Mongoose
const { Schema, model } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => {
                return new Types.ObjectId()
            },
        },
        reactionBody: {
            type: String,
            required: () => {
                return this.reactionBody.length <= 280
            }
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: [{
            type: Date,
            default: Date.now,
            get: (createdAt) => {
                return moment(createdAt).format("MMMM Do YYYY, h:mm:ss")
            }
        }]
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: () => {
                return this.thoughtText.length >= 1 && this.thoughtText.length <= 280
            },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema],

        createdAt: [{
            type: Date,
            default: Date.now,
            get: (createdAt) => {
                return moment(createdAt).format("MMMM Do YYYY, h:mm:ss")
            }
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

// Retrieve the length of thought's reaction array
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

// create the Thought model using ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// Export Thought module
module.exports = Thought;