const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt");
const pool = require("../config/database");

async function register(email, password) {
    const [users] = await pool.query(
        "SELECT id FROM users WHERE email = ?",
        [email]
    );

    // Kiểm tra có ít nhất một tài khoản có email này (trùng email) hay không
    if (users.length > 0) {
        const error = new Error("Email already exists");
        error.code = "EMAIL_EXISTS";
        throw error;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
        "INSERT INTO users (email, password_hash) VALUES (?, ?)",
        [email, passwordHash]
    );

    return {
        id: result.insertId,
        email: email,
    };
}

async function login(email, password) {
    const [users] = await pool.query(
        "SELECT id, email, password_hash FROM users WHERE email = ?",
        [email]
    );

    if (users.length === 0) {
        const error = new Error("Invalid email or password");
        error.code = "INVALID_CREDENTIALS";
        throw error;
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.code = "INVALID_CREDENTIALS";
        throw error;
    }

    const token = generateToken(user.id);

    return {
        id: user.id,
        email: user.email,
        token: token,
    };
}

module.exports = {
    register,
    login,
};