import React from 'react';
import { Col, Divider, Row, Form, Input, Button, notification } from 'antd';
import { createUserApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const RegisterPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { name, email, password } = values;
        try {
            const res = await createUserApi({ name, email, password });
            if (res && res.EC === 0) {
                notification.success({
                    message: 'CREATE USER',
                    description: 'Success',
                });
                navigate('/login');
            } else {
                notification.error({
                    message: 'CREATE USER',
                    description: res?.EM || 'Failed to create user',
                });
            }
        } catch (error) {
            notification.error({
                message: 'CREATE USER',
                description: 'Server error',
            });
        }
    };

    return (
        <Row justify="center" style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{ padding: "15px", margin: "5px", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <legend>Đăng ký tài khoản</legend>
                    <Form
                        name="register"
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
                                { min: 6, message: 'Password must be at least 6 characters!' },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                { required: true, message: 'Please input your name!' },
                                { min: 2, message: 'Name must be at least 2 characters!' },
                                { max: 50, message: 'Name must be less than 50 characters!' }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <Link to={"/"}><ArrowLeftOutlined /> Back to Home</Link>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        Đã có tài khoản? <Link to={"/login"}>Đăng nhập</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    );
};

export default RegisterPage;
