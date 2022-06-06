const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        default: false,
        type: Boolean
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
});

module.exports =  mongoose.model('Task', TaskSchema)