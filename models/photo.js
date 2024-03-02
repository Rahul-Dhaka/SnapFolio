const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    comment: [{ id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }}],
    title:{ type: String },
    imageUrl: { type: String, required: true },
    caption: String,
    tags: [{ type: String}],
    likes: [{ id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }}],
}, { timestamps: true });

module.exports = mongoose.model('Photo', photoSchema);


// imageUrl: { type: String, required: true },
// Add other photo-related fields as needed
// For example: filters, likes count, etc.
    // location: {
    //     type: {
    //         type: String,
    //         enum: ['Point'],
    //     },
    //     coordinates: {
    //         type: [Number],
    //         index: '2dsphere',
    //     },
    // },