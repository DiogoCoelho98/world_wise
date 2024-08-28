import { useAuth } from "../contexts/FakeAuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Component that avoids the user to have access to <AppLayout/>
export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() =>{
        if (!isAuthenticated) navigate("/");
    }, [navigate, isAuthenticated])

    return isAuthenticated ? children : null;
}