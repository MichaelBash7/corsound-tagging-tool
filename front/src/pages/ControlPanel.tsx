import React, {FC, useContext} from 'react';
import {Card, Layout, Menu, Row} from "antd";
import CreateUser from "../components/CreateUser";

const ControlPanel: FC = () => {

    return (

        <Layout.Content>
            <Row justify="center" align="middle" style={{height: '100vh'}}>
                <Card>
                    <CreateUser/>
                </Card>
            </Row>
        </Layout.Content>
    );
};

export default ControlPanel;