// hiển thị và xử lý biểu mẫu đăng ký, bao gồm Email, Password và nút Register
import { useState } from "react";
import { register } from "../services/authService";

function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const data = await register(email, password);
            alert(data.message);
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create an account</h2>

            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email} // giá trị hiển thị trong Input được lấy từ State email
                    onChange={(e) => setEmail(e.target.value)} // khi người dùng nhập vào Input, State email sẽ được cập nhật với giá trị mới
                />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password} // giá trị hiển thị trong Input được lấy từ State password
                    onChange={(e) => setPassword(e.target.value)} // khi người dùng nhập vào Input, State password sẽ được cập nhật với giá trị mới
                />
            </div>

            <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword} // giá trị hiển thị trong Input được lấy từ State confirmPassword
                    onChange={(e) => setConfirmPassword(e.target.value)} // khi người dùng nhập vào Input, State confirmPassword sẽ được cập nhật với giá trị mới
                />
            </div>

            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterForm;