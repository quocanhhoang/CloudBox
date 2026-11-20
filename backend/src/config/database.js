const mysql = require("mysql2/promise");

// Tạo Connection Pool để quản lý các kết nối đến MySQL.
const pool = mysql.createPool({
    // Các thông số cấu hình
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Xuất Pool để những file khác, chẳng hạn Service, có thể sử dụng.
module.exports = pool;