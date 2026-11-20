import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const data = await login(email, password);
            localStorage.setItem("token", data.data.token);
            navigate("/home");
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email} // Giá trị hiển thị trong ô Email được lấy từ State email
                    onChange={(e) => setEmail(e.target.value)} // Khi người dùng nhập hoặc thay đổi nội dung, React gọi setEmail() để cập nhật State.
                />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;