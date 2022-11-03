// Require Mongoose
const { Schema, Types, model } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt) => moment(createdAt).format("MMM DD YYYY, h:mm a")
        }
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
            required: true,
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema],

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt) => moment(createdAt).format("MMM DD YYYY, h:mm a")
        }
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