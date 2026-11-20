const jwt = require("jsonwebtoken");

function generateToken(userId) { // nhận ID của người dùng cần đăng nhập
    return jwt.sign(
        { userId }, // dữ liệu được đóng gói vào Token. Sau này Backend có thể đọc ID này để xác định người dùng
        process.env.JWT_SECRET, // khóa bí mật dùng để ký Token
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d", // thời hạn Token, hiện tại lấy từ .env, mặc định là "1d" nếu không có cấu hình
        }
    );
}

module.exports = generateToken;