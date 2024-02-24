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
        
        const photo = await Photo.findOne({_id:photoId});
        
        // Checking if the user has already liked the photo or not
        console.log(photo.likes)
        const existingLike = photo.likes.filter(like => like.id==req.user._id);
        console.log(existingLike)
        console.log((req.user._id));

        if (existingLike.length==0) {
            // Add like to the photo
            photo.likes.push({
               id: req.user._id
            });
            await photo.save();
            console.log(photo.likes)
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
        const photo = await Photo.findOne({_id:photoId});

        // Remove like from the photo
        photo.likes = photo.likes.filter(like => like.id != req.user._id);
        await photo.save();

        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
