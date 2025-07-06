const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
router.get("/", async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.status(200).json({
      message: "All users fetched",
      users: allUsers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, gender } = req.body;

    if (!first_name || !last_name || !email || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newUser = new userModel({ first_name, last_name, email, gender });
    await newUser.save();

    res.status(201).json({
      message: "New user created",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      message: "User updated",
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      message: "User deleted",
      user: deletedUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
