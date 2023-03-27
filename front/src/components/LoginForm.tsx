import React, {FC, useContext, useState} from 'react';
import {Alert, Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const LoginForm : FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    return (
        <Form>
            {store.errorMessage && (
                <Form.Item>
                    <Alert message={store.errorMessage} type="error" showIcon />
                </Form.Item>)}
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required('Please input your username!')]}
            >
                <Input value={email}
                       onChange={e => setEmail(e.target.value)}/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('Please input your password!')]}
            >
                <Input  value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={"password"}/>
            </Form.Item>
            <Form.Item>
                <Button onClick={() => store.login(email, password)} type="primary" htmlType="submit" >
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};

export default observer (LoginForm);