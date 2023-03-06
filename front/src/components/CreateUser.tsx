import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {observer} from "mobx-react-lite";

const CreateUser : FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    return (
        <Form>
            <Form.Item
                label="Create an username"
                name="username"
                rules={[rules.required('Please input any username!')]}
            >
                <Input value={email}
                       onChange={e => setEmail(e.target.value)}/>
            </Form.Item>
            <Form.Item
                label="Create a password"
                name="password"
                rules={[rules.required('Please input any password!')]}
            >
                <Input  value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={"password"}/>
            </Form.Item>

            <Form.Item>
                <Button onClick={() => store.registration(email, password)} type="primary" htmlType="submit" >
                    Create new user
                </Button>
            </Form.Item>

        </Form>

    );
};

export default observer (CreateUser);