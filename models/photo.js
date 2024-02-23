const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title:{ type: String, required: true },
    imageUrl: { type: String, required: true },
    desc: { type: String, required: true },
    caption: String,
    tag: [{ type: String}],
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