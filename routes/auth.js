const express = require("express");
const router = express.Router();
const {
  signupValidator,
  signinValidator,
  validatorResult,
  postValidator,
  
} = require("../middleware/validator");
const { signupController, signinController, postController } = require("../controllers/auth");

router.post("/signup", signupValidator, validatorResult, signupController);

router.post("/signin", signinValidator, validatorResult, signinController);

router.post("/postcomp",postValidator,postController);

module.exports = router;
