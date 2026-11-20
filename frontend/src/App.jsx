import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes> // Bao bọc các tuyến đường
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} /> // Đường dẫn đăng ký và Hiển thị component Register
        <Route path="/login" element={<Login />} /> // Đường dẫn đăng nhập và Hiển thị component Login
        <Route path="/" element={<Navigate to="/register" replace />} /> // khi người dùng truy cập trang chủ '/', React Router sẽ tự động chuyển họ sang '/register'. 'replace' giúp thay thế mục lịch sử hiện tại thay vì thêm một mục mới
    </Routes>
  );
}

export default App;
