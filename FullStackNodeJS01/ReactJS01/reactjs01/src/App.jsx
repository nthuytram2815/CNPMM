import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

export default function App() {
    const { token } = useContext(AuthContext);

    const PrivateRoute = ({ children }) => {
        return token ? children : <Navigate to="/login" />;
    };

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            } />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
