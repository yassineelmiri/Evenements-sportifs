const mongoose = require("mongoose");
const Joi = require("joi");
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    stade: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    places: {
      type: Number,
      required: true,
    },
    horaire: { 
      type: Date,
       required: false, 
      },
    image: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);

// Validate Create Post
function validateCreateEvenments(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(200).required(),
    stade: Joi.string().trim().min(10).required(),
    category: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

// Validate Update Post
function validateUpdateEvenments(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(200),
    stade: Joi.string().trim().min(10),
    category: Joi.string().trim(),
  });
  return schema.validate(obj);
}

module.exports = {
  Post,
  validateCreateEvenments,
  validateUpdateEvenments,
};
