const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    photos: { type: mongoose.Schema.Types.ObjectId, ref: 'photo', required: true },

    comments: {type:String},    
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
