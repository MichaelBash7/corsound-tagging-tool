import React, {FC, useContext, useState} from 'react';
import {Button, Layout, Space} from "antd";
import CreateUser from "../components/CreateUser";
import MyModal from "../components/ui/modal/MyModal";
import UserTable from "../components/UserTable";

const Users: FC = () => {

    const [modal, setModal] = useState(false);

    return (
        <Layout.Content style={{height: '100vh'}}>
            <Space style={{margin: '16px 0'}}>
                <Button style={{marginTop: 30}} onClick={() => setModal(true)}>
                    Create user
                </Button>

                <MyModal visible={modal} setVisible={setModal}>
                    <CreateUser/>
                </MyModal>
            </Space>

            <UserTable/>
        </Layout.Content>
    );
};

export default Users;