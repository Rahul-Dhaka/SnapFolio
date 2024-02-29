// controllers/photoController.js

const Photo = require('../models/photo');

// exports.getPhotoDetails = async (req, res) => {
//     try {
//         const { photoId } = req.params;
//         const photo = await Photo.findById(photoId);
//         console.log(photo);
//         res.render('home', { photo });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// };

exports.likePhoto = async (req, res) => {
    try {
        const { photoId } = req.params;
        const photo = await Photo.findById(photoId);

        // Check if the user has already liked the photo
        const existingLike = photo.likes.find(like => like.equals(req.user._id));

        if (!existingLike) {
            // Add like to the photo
            photo.likes.push(req.user._id);
            await photo.save();
        }

        res.redirect('/home'); // Redirect to home page
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.unlikePhoto = async (req, res) => {
    try {
        const { photoId } = req.params;
        const photo = await Photo.findById(photoId);

        // Remove like from the photo
        photo.likes = photo.likes.filter(like => !like.equals(req.user._id));
        await photo.save();

        res.redirect(`/home`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};