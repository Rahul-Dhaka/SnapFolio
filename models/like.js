const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    photo: { type: mongoose.Schema.Types.ObjectId, ref: 'Photo', required: true },
});

module.exports = mongoose.model('Like', likeSchema);