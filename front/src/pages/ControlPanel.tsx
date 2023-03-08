import React, {FC, useContext} from 'react';
import {Card, Layout, Menu, Row} from "antd";
import CreateUser from "../components/CreateUser";
import UserTable from "../components/UserTable";

const ControlPanel: FC = () => {

    return (

        <Layout.Content>
            <Row>
                <Card>
                    <CreateUser/>
                </Card>
            </Row>
            <UserTable/>
        </Layout.Content>
    );
};

export default ControlPanel;