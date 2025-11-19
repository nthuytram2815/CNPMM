import React, { useContext } from "react";
import { Col, Row, Form, Input, Button, notification, Divider } from 'antd';
import { loginApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { AuthContext } from "../components/context/authContext";

const LoginPage = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const onFinish = async (values) => {
        const { email, password } = values;
        try {
            const res = await loginApi({ email, password });
            if (res && res.EC === 0) {
                localStorage.setItem('access_token', res.access_token);
                notification.success({ message: 'LOGIN', description: "Success" });
                setAuth({
                    isAuthenticated: true,
                    user: { email: res.user?.email ?? "", name: res.user?.name ?? "" }
                });
                navigate('/');
            } else {
                notification.error({ message: 'LOGIN', description: res?.EM || 'Login failed' });
            }
        } catch (error) {
            notification.error({ message: 'LOGIN', description: 'Server error' });
        }
    };

    return (
        <Row justify="center" style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{ padding: "15px", margin: "5px", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <legend>Đăng nhập</legend>
                    <Form
                        name="login"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Invalid email format!' }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { min: 6, message: 'Password must be at least 6 characters!' }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">Đăng nhập</Button>
                        </Form.Item>
                    </Form>
                    <Link to="/" ><ArrowLeftOutlined /> Go to Home Page</Link>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    );
};

export default LoginPage;
