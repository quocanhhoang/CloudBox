const authService = require("../services/authService");

async function register(req, res) {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" || // email phải là chuỗi
            typeof password !== "string" || // password phải là chuỗi
            !email.trim() || // loại bỏ khoảng trắng ở đầu và cuối chuỗi
            !password.trim() // loại bỏ khoảng trắng ở đầu và cuối chuỗi
        ) { // email hoặc password không được gửi lên, hoặc có giá trị rỗng
            return res.status(400).json({ // Trả về lỗi 400 Bad Request
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await authService.register(email, password);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });

    } catch (error) {
        // Xử lý lỗi khi email đã tồn tại
        if (error.code === "EMAIL_EXISTS") {
            return res.status(409).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await authService.login(email, password);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: user,
        });

    } catch (error) {
        if (error.code === "INVALID_CREDENTIALS") {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

function getMe(req, res) {
    return res.status(200).json({
        success: true,
        message: "User information retrieved successfully",
        data: {
            userId: req.user.userId,
        },
    });
}

module.exports = {
    register,
    login,
    getMe,
};