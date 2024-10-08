const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    try {
      const exists = await userModel.findOne({
        userName: req.body.userName,
      });

      if (exists) {
        return res.status(409).json({
          message: "user_already_exists",
        });
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, 10);

      const newUser = await new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        profilePicture: req.body.profilePicture,
        dob: req.body.dob,
        bio: req.body.bio,
        password: hashedPassword,
        role: "user",
      }).save();

      const token = jwt.sign(
        {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          id: newUser._id,
          userName: newUser.userName,
          profilePicture: newUser.profilePicture,
          dob: newUser.dob,
          bio: newUser.bio,
          role: newUser.role,
        },
        process.env.SECRET_KEY
      );

      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    try {
      const user = await userModel.findOne({
        userName: req.body.userName,
      });

      if (!user) {
        return res.status(404).json({ message: "user_not_found" });
      }

      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
          {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            id: user._id,
            userName: user.userName,
            profilePicture: user.profilePicture,
            dob: user.dob,
            bio: user.bio,
            role: user.role,
          },
          process.env.SECRET_KEY
        );

        return res.status(200).json({ token });
      } else {
        return res.status(401).json({
          message: "Invalid password.",
        });
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.user.id;

      if (req.user.role !== "user") {
        return res.status(403).json({ message: "Access denied." });
      }

      const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.user.id;

      if (req.user.role !== "user") {
        return res.status(403).json({ message: "Access denied." });
      }

      const deletedUser = await userModel.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      res.json({ message: "User deleted successfully." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
