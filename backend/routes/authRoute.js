const router = require("express").Router();
const {
  registerUserCtrl,
  LoginUserCtrl,
  verifyUserAccountCtrl,
} = require("../controllers/AuthController");
// /api/auth/register
router.post("/register", registerUserCtrl);
// /api/auth/login
router.post("/login", LoginUserCtrl);
// /api/auth/:userId/verify/:token
router.get("/:userId/verify/:token", verifyUserAccountCtrl);

module.exports = router;
