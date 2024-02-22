const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: { type: String, required: true },
    caption: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
        },
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // Add other photo-related fields as needed
    // For example: filters, likes count, etc.
}, { timestamps: true });

module.exports = mongoose.model('Photo', photoSchema);
