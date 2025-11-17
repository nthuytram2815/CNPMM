import { useState, useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";
import request from "../util/request";
import { Button, Input, Card } from "antd";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            let res = await request.post("/login", { email, password });
            if (res.data.EC === 0) {
                login(res.data.DT.token);
                navigate("/");
            } else {
                alert(res.data.EM);
            }
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <Card title="Login" style={{ width: 400, margin: "50px auto" }}>
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input.Password
                placeholder="Password"
                style={{ marginTop: 10 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="primary" block style={{ marginTop: 15 }} onClick={handleLogin}>
                Login
            </Button>
        </Card>
    );
}
