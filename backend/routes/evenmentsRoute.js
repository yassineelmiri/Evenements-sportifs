const router = require("express").Router();
const {
  createEvenmentsCtrl,
  getAllEvenmentsCtrl,
  getSingleEvenmentsCtrl,
  getEvenmentsCountCtrl,
  deleteEvenmentsCtrl,
  updateEvenmentsCtrl,
  updateEvenmentsImageCtrl,
  toggleLikeEvenmentsCtrl,
} = require("../controllers/evenmentsController");
const photoUpload = require("../middlewares/photoUpload");
const { VerifyToken } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");

// /evenments
router
  .route("/")
  .post(VerifyToken, photoUpload.single("image"), createEvenmentsCtrl)
  .get(getAllEvenmentsCtrl);

// /evenments/count
router.route("/count").get(getEvenmentsCountCtrl);

// /evenments/:id
router
  .route("/:id")
  .get(validateObjectId, getSingleEvenmentsCtrl)
  .delete(validateObjectId, VerifyToken, deleteEvenmentsCtrl)
  .put(validateObjectId, VerifyToken, updateEvenmentsCtrl);

// /evenments/update-image/:id
router
  .route("/update-image/:id")
  .put(
    validateObjectId,
    VerifyToken,
    photoUpload.single("image"),
    updateEvenmentsImageCtrl
  );

router.route("/:id/like").put(VerifyToken, toggleLikeEvenmentsCtrl);

module.exports = router;
