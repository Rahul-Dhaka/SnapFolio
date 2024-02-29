// controllers/photoController.js

const Photo = require('../models/photo');

module.exports.getPhotoDetails = async (req, res) => {
    if (!req.user) {
      res.redirect("/login");
    } else {
      try {
        const photoId = req.params.photoId;
        const selectedPhoto = await Photo.findById(photoId)
        // .populate('user');
        res.render("photoDetails", { selectedPhoto });
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    }
  };

//Update photo Caption
module.exports.updatePhotoCaption = async (req, res) => {
try {
    const photoId = req.params.photoId;
    const newCaption = req.body.newCaption;

    // Updating the photo caption in the database
    await Photo.findByIdAndUpdate(photoId, { caption: newCaption });

    res.redirect(`/photo/${photoId}`);
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
}
};
// Delete Photo
module.exports.deletePhoto = async (req, res) => {
    try {
      const photoId = req.params.photoId;
  
      // Delete the photo from the database
      await Photo.findByIdAndDelete(photoId);
  
      res.redirect('/profile'); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
};
//Like Photo
exports.likePhoto = async (req, res) => {
    try {
        const { photoId } = req.params;
        const photo = await Photo.findById(photoId);

        // Checking if the user has already liked the photo
        const existingLike = photo.likes.find(like => like.equals(req.user._id));

        if (!existingLike) {
            // Add like to the photo
            photo.likes.push(req.user._id);
            await photo.save();
        }

        res.json({ success: true, likes: photo.likes.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

exports.unlikePhoto = async (req, res) => {
    try {
        const { photoId } = req.params;
        const photo = await Photo.findById(photoId);

        // Remove like from the photo
        photo.likes = photo.likes.filter(like => !like.equals(req.user._id));
        await photo.save();

        res.json({ success: true, likes: photo.likes.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};