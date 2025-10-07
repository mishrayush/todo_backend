const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");
// const auth = require("../../common/middlewares/auth.middleware");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
// router.get("/profile", auth, UserController.profile);

module.exports = router;
