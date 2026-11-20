const express = require("express");
const router = express.Router(); // Tạo một Router riêng cho nhóm API xác thực

const authController = require("../controllers/authController"); // Import Controller xử lý xác thực
const authMiddleware = require("../middleware/authMiddleware");

router.post("/auth/register", authController.register); // Khai báo API sử dụng phương thức POST
router.post("/auth/login", authController.login);

router.get("/auth/me", authMiddleware, authController.getMe);

module.exports = router; // Xuất Router để server.js sử dụng