const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boardSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userID:
    {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Subject = mongoose.model('Board', boardSchema);

module.exports = Subject;