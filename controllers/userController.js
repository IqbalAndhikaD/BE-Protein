const userTable = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  // Get All User
  allUser: async (req, res) => {
    try {
      const User = await userTable.find();
      res.status(200).json({ User });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // Register User
  registerUser: async (req, res) => {
    try {
      const { fullname, username, password, email, bidang } = req.body;

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const User = new userTable({
        fullname,
        username,
        password: hashedPassword,
        email,
        bidang,
      });
      await User.save();
      res.status(201).json({
        message: "User berhasil didaftarkan",
        User,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // Login User
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Cek username
      const user = await userTable.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "Username tidak ditemukan" });
      }

      // Cek password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Password salah" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.status(200).json({
        message: "Login berhasil",
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          fullname: user.fullname,
          bidang: user.bidang,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // Get User By Id
  getUserById: async (req, res) => {
    try {
      const { id } = req.params; 

      const user = await userTable.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // Update User
  updateUser: async (req, res) => {
    try {
      const { id } = req.params; 
      const updates = req.body; 

      const user = await userTable.findByIdAndUpdate(id, updates, {
        new: true,
      }); 

      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params; 

      const user = await userTable.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }

      res.status(200).json({ message: "User berhasil dihapus" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  logoutUser: async (req, res) => {
    try {
        res.clearCookie("jwtToken"); // Asumsi JWT disimpan dalam cookie dengan nama 'jwtToken'
      res.status(200).json({ message: "Logout berhasil" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};
