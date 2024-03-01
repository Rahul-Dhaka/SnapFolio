const photo = require('../models/photo');
const Comment = require('../models/comment');
const comment = require('../models/comment');

module.exports.getCommentDetails = async (req, res) => {
    if (!req.user) {
      res.redirect("/login");
    } else {
      try {
        const photoId = req.params.photoId;
        const selectedPhoto = await photo.findById(photoId).populate('user');
        const comments = await Comment.find({photos :photoId}).populate('user');
        // console.log(comments)
        res.render("commentDetails",
         { selectedPhoto, comments }
         );
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    }
  };

  
module.exports.postCommentDetails = async (req, res) => {
  const user = req.user._id;
  const photoId = req.params.photoId;
  console.log(photoId);
console.log(req.body.newComment);
console.log(user);

let insertComment = await Comment.create({user, photos: photoId, comments: req.body.newComment});
console.log("comment done");
  res.redirect(`/comment/${photoId}`)
// res.send('done');


  // try {
  //   await Comment.create({
  //     user,
  //     photos:photoId,
  //     comments:req.body.newComment
  //   });
  //   res.send("ok");
   
  // } catch (err) {
  //   res.render('error',{
  //       msg: err.message
  //   })
  // }
};