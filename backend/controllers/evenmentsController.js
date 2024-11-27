const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const {
  Post,
  validateUpdateEvenments,
} = require("../models/Post");

/**-----------------------------------------------
* @desc Create New Post
* @route /api/evenments
* @method POST
* @access Public
--------------------------------------------------*/
module.exports.createEvenmentsCtrl = asyncHandler(async (req, res) => {
  try {
    // Vérifier si le fichier est bien reçu
    if (!req.file) {
      return res.status(400).json({ message: "Aucune image fournie" });
    }

    const { title, stade, category ,places } = req.body;

    // Validation supplémentaire : vérifier que tous les champs requis sont présents
    if (!title || !stade || !category || !places) {
      return res
        .status(400)
        .json({ message: "Tous les champs requis doivent être remplis." });
    }

    // Créer le post et associer l'utilisateur à partir de req.user.id (assurez-vous que le middleware de vérification de token passe l'utilisateur dans req.user)
    const post = await Post.create({
      title,
      stade,
      category,
      places,
      user: req.user.id, // Ajouter l'utilisateur connecté ici
      image: {
        url: `http://localhost:5000/images/${req.file.filename}`,
        publicId: null,
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Erreur lors de la création du post :", error);
    res.status(500).json({ message: "Erreur lors de la création du post." });
  }
});

/**-----------------------------------------------
* @desc Get All Evenments
* @route /api/evenments
* @method GET
* @access public
--------------------------------------------------*/

module.exports.getAllEvenmentsCtrl = asyncHandler(async (req, res) => {
  const POST_PER_PAGE = 10;
  const { pageNumber, category } = req.query;
  let evenments;
  if (pageNumber) {
    evenments = await Post.find()
      .skip((pageNumber - 1) * POST_PER_PAGE)
      .limit(POST_PER_PAGE)
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else if (category) {
    evenments = await Post.find({ category })
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else {
    evenments = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  }
  res.status(200).json(evenments);
});

/**-----------------------------------------------
* @desc Get Single Evenments
* @route /api/evenments/:id
* @method GET
* @access public
--------------------------------------------------*/
module.exports.getSingleEvenmentsCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("user", [
    "-password",
  ]);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  res.status(200).json(post);
});
/**-----------------------------------------------
* @desc Get evenments count
* @route /api/evenments/count
* @method GET
* @access public
--------------------------------------------------*/
module.exports.getEvenmentsCountCtrl = asyncHandler(async (req, res) => {
  const count = await Post.countDocuments();
  res.status(200).json(count);
});
/**-----------------------------------------------
* @desc Delete evenments 
* @route /api/evenments/:id
* @method DELETE
* @access private (only admin or owner of the post)
--------------------------------------------------*/
module.exports.deleteEvenmentsCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  console.log();

  if (req.user.isAdmin || req.user.id === post.user.toString()) {
    await Post.findByIdAndDelete(req.params.id);

  
    

    res.status(200).json({
      message: "post has been deleted successfully",
      postId: post._id,
    });
  } else {
    res.status(403).json({ message: "access denied, forbidden" });
  }
});
/**-----------------------------------------------
* @desc Update evenments 
* @route /api/evenments/:id
* @method PUT
* @access private (only owner of the Evenments)
--------------------------------------------------*/
module.exports.updateEvenmentsCtrl = asyncHandler(async (req, res) => {
  // 1. Validation
  const { error } = validateUpdateEvenments(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // 2. Get the post from DB and check if post exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  // 3. check if this post belong to logged in user
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "access denied, you are not allowed" });
  }
  // 4. Update post
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        stade: req.body.stade,
        category: req.body.category,
      },
    },
    { new: true }
  ).populate("user", ["-password"]);
  // 5. Send response to the client
  res.status(200).json(updatedPost);
});

/**-----------------------------------------------
* @desc Update Evenments Image/:id
* @route /api/evenments/:id
* @method PUT
* @access private (only owner of the Evenments)
--------------------------------------------------*/
module.exports.updateEvenmentsImageCtrl = asyncHandler(async (req, res) => {
  // 1. Validation
  if (!req.file) {
    return res.status(400).json({ message: "no image provided" });
  }
  // 2. Get the post from DB and check if post exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  // 3. check if this post belong to logged in user
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "access denied, you are not allowed" });
  }
  // 4. Update post image
  //   await cloudinartRemoveImage(post.image.publicId);

  // 5. Send response to the client
  const imagePath = path.join(__dirname, ` ../images/${req.file.filename} `);
  //   const result = await cloudinartRemoveImage(imagePath);

  //6. Update the image field in the db
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: {
          url: imagePath,
          publicId: post.image.publicId,
        },
      },
    },
    { new: true }
  ).populate("user", ["-password"]);

  // 7.Send responce to client
  res.status(200).json(updatedPost);

  // 8.Remove image from the server
  fs.unlinkSync(imagePath);
});
/**-----------------------------------------------
* @desc Create Post Like/:id
* @route /api/evenments/:id/like
* @method PUT
* @access private (only owner of the post)
--------------------------------------------------*/

module.exports.toggleLikeEvenmentsCtrl = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likes.includes(req.user._id);

    if (isLiked) {
      post.likes = post.likes.filter(
        (userId) => userId.toString() !== req.user._id.toString()
      );
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error("Error occurred while liking the post:", error);
    res
      .status(500)
      .json({ message: "An error occurred while liking the post." });
  }
});
