const userService = require("../providers/userService");
var express = require('express');
var router = express.Router();

router.post("/register", userService.register);
router.post("/login", userService.login);
router.put("/update", userService.updateUser);
router.delete("/delete", userService.deleteUser);

module.exports = router;
