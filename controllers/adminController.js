const adminTable = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  //Get All Admins
  allAdmin: async (req, res) => {
    try {
      const Admin = await adminTable.find();
      res.status(200).json({ Admin });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  //Register Admin
  registerAdmin: async (req, res) => {
    try {
      const { username, name, password, email } = req.body;

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const Admin = new adminTable({
        username,
        name,
        password: hashedPassword,
        email,
      });
      await Admin.save();
      res.status(201).json({
        message: "Admin berhasil didaftarkan",
        Admin,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  //Login Admin
  loginAdmin: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Cek username
      const admin = await adminTable.findOne({ username });
      if (!admin) {
        return res.status(400).json({ message: "Username tidak ditemukan" });
      }

      // Cek password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Password salah" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: admin._id, username: admin.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.status(200).json({
        message: "Login berhasil",
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getAdminById: async (req, res) => {
    try {
      const adminId = req.params.id; 
      const admin = await adminTable.findById(adminId);

      if (!admin) {
        return res.status(404).json({ message: "Admin tidak ditemukan" });
      }

      res.status(200).json({ admin });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan saat mengambil admin" });
    }
  },

  // Update Admin
  updateAdmin: async (req, res) => {
    try {
      const adminId = req.params.id; 
      const updates = req.body; 

      const updatedAdmin = await adminTable.findByIdAndUpdate(
        adminId,
        updates,
        {
          new: true, 
        }
      );

      if (!updatedAdmin) {
        return res.status(404).json({ message: "Admin tidak ditemukan" });
      }

      res.status(200).json({ updatedAdmin });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan saat memperbarui admin" });
    }
  },

  // Delete Admin
  deleteAdmin: async (req, res) => {
    try {
      const adminId = req.params.id; // Assuming ID is in the URL parameter

      const deletedAdmin = await adminTable.findByIdAndDelete(adminId);

      if (!deletedAdmin) {
        return res.status(404).json({ message: "Admin tidak ditemukan" });
      }

      res.status(200).json({ message: "Admin berhasil dihapus" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan saat menghapus admin" });
    }
  },

  // Logout Admin
  logoutAdmin: async (req, res) => {
    try {
      res.clearCookie("jwtToken"); // Asumsi JWT disimpan dalam cookie dengan nama 'jwtToken'
      res.status(200).json({ message: "Logout berhasil" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan saat logout" });
    }
  },
};
