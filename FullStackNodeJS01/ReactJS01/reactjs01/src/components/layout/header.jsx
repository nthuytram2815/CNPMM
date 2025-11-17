import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function Header() {
    const { logout, token } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <header style={{ padding: 20, background: "#eee", marginBottom: 20 }}>
            <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>

            {token ? (
                <Button danger style={{ marginLeft: 10 }} onClick={() => { logout(); navigate("/login"); }}>
                    Logout
                </Button>
            ) : (
                <Link to="/login">
                    <Button type="primary" style={{ marginLeft: 10 }}>Login</Button>
                </Link>
            )}
        </header>
    );
}
