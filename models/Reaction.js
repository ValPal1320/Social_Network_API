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
                return moment(createdAt).format("m/d/YYYY HH:MM:SS")
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

// Export ReactionSchema module
module.exports = ReactionSchema;