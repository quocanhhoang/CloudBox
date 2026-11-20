require("dotenv").config(); // Đọc các biến môi trường từ .env

const pool = require("./database"); // Lấy Connection Pool chúng ta vừa tạo

async function testConnection() {
    try {
        const [rows] = await pool.query("SELECT 1 AS result"); // Thực hiện một câu truy vấn thực tế để kiểm tra kết nối

        console.log("MySQL connected successfully!");
        console.log("Query result:", rows[0].result);
    } catch (error) {
        console.error("MySQL connection failed:", error.message);
    } finally {
        await pool.end(); // Đóng Connection Pool sau khi kiểm tra xong
    }
}

testConnection();