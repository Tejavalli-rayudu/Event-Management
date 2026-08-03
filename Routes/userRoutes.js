const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/query", userController.getUsersByQuery);
router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);

router.put("/:id", userController.updateUser);

router.patch("/:id", userController.patchUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;