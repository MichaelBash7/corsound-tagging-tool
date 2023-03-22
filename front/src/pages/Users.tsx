import React, {FC, useContext, useState} from 'react';
import {Button, Layout, Breadcrumb} from "antd";
import CreateUser from "../components/CreateUser";
import MyModal from "../components/ui/modal/MyModal";
import UserTable from "../components/UserTable";

const Users: FC = () => {

    const [modal, setModal] = useState(false);

    return (
        <Layout.Content style={{height: '100vh'}}>

            <Breadcrumb style={{margin: '16px 0'}}>
                <Button style={{marginTop: 30}} onClick={() => setModal(true)}>
                    Create users
                </Button>

                <MyModal visible={modal} setVisible={setModal}>
                    <CreateUser/>
                </MyModal>

            </Breadcrumb>

            <UserTable/>
        </Layout.Content>
    );
};

export default Users;