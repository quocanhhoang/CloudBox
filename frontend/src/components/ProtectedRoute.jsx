import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMe } from "../features/auth/services/authService";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        let cancelled = false;
        if (token) {
            const checkAuthentication = async () => {
                try {
                    await getMe();
                    if (!cancelled) {
                        setIsAuthenticated(true);
                    }
                } catch {
                    if (!cancelled) {
                        setIsAuthenticated(false);
                    }
                }
            };

            checkAuthentication();
        } else {
            setIsAuthenticated(false);
        }

        return () => {
            cancelled = true;
        };
    }, [token]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return token && isAuthenticated ? children : <Navigate to="/login" replace />; 
}

export default ProtectedRoute;