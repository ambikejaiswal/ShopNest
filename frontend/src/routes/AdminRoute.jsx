import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {

    const { user } = useAuth();

    // User login nahi hai
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // User admin nahi hai
    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    // User admin hai
    return children;
};

export default AdminRoute;