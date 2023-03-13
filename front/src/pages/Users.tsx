import React, {FC, useContext, useState} from 'react';
import {Card, Layout, Menu, Row, Breadcrumb} from "antd";
import CreateUser from "../components/CreateUser";
import MyButton from "../components/ui/buttons/MyButton";
import MyModal from "../components/ui/modal/MyModal";
import {IUser} from "../models/IUser";
import UserService from "../services/UserService";
import UserTable from "../components/UserTable";

const Users: FC = () => {

    const [modal, setModal] = useState(false);

    return (
        <Layout.Content style={{height: '100vh'}}>

            <Breadcrumb style={{margin: '16px 0'}}>
                <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                    Create users
                </MyButton>

                <MyModal visible={modal} setVisible={setModal}>
                    <CreateUser/>
                </MyModal>

            </Breadcrumb>

            <UserTable/>
        </Layout.Content>
    );
};

export default Users;