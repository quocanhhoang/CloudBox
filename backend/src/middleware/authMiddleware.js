const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    // Kiểm tra xem có header Authorization và nó có bắt đầu bằng "Bearer " hay không
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Access token is required",
        });
    }

    const token = authHeader.split(" ")[1];

    // Xác minh Token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.userId };
        next(); // Tiếp tục xử lý request
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}

module.exports = authMiddleware;