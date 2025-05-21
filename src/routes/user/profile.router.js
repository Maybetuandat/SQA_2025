const express = require("express");
const router = express.Router();
const db = require("../../models/index");
const profileController = require("../../controllers/user/profile/profile.controller");

router.get("/", profileController.index);
router.put("/save-profile/:admin", async (req, res) => {
  try {
    const adminTk = req.params.admin; // Lấy ID của admin từ đường dẫn URL
    const updateData = req.body; // Dữ liệu cập nhật từ form

    // Tìm admin cần cập nhật
    let admin = await db.Admin.findByPk(adminTk);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Cập nhật thông tin của admin
    // UserName: {
    //   type: DataTypes.STRING,
    //   primaryKey: true,
    // },
    // Email: DataTypes.STRING,
    // Facebook: DataTypes.STRING,
    // Instagram: DataTypes.STRING,
    // FirstName: DataTypes.STRING,
    // LastName: DataTypes.STRING,
    // Pass: DataTypes.STRING,
    // Avatar: DataTypes.STRING,
    // admin.UserName = 
    await admin.update(updatedData);

    // Trả về phản hồi thành công
    return res
      .status(200)
      .json({ message: "Admin updated successfully", admin });
  } catch (error) {
    // Xử lý lỗi
    console.error("Error updating admin:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
