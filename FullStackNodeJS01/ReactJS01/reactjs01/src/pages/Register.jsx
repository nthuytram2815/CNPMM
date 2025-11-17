import { useState } from "react";
import request from "../util/request";
import { Button, Input, Card } from "antd";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            let res = await request.post("/register", { email, username, password });
            if (res.data.EC === 0) {
                alert("Register success!");
                navigate("/login");
            } else {
                alert(res.data.EM);
            }
        } catch (err) {
            alert("Register failed");
        }
    };

    return (
        <Card title="Register" style={{ width: 400, margin: "50px auto" }}>
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Username" style={{ marginTop: 10 }} value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input.Password placeholder="Password" style={{ marginTop: 10 }} value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="primary" block style={{ marginTop: 15 }} onClick={handleRegister}>
                Register
            </Button>
        </Card>
    );
}
