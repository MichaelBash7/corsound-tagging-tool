import React, {FC} from 'react';
import {Card, Layout, Row} from 'antd';
import LoginForm from "../components/LoginForm";

const Login: FC = () => {

    return (
        <Layout.Content>
            <Row justify="center" align="middle" style={{height: '100vh'}}>
                <Card>
                <LoginForm/>
                </Card>
            </Row>
        </Layout.Content>
    );
};
export default Login;