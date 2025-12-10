import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateGuard({ children }) {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    if (!isAuthenticated) {
        const encodedPath = encodeURIComponent(location.pathname + location.search);
        return <Navigate to={`/login?from=${encodedPath}`} replace />;
    }

    return children;
}