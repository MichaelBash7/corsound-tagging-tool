import React, {FC, useState} from 'react';
import {Breadcrumb, Layout,} from "antd";
import CreateUser from "../components/CreateUser";
import MyButton from "../components/ui/buttons/MyButton";
import MyModal from "../components/ui/modal/MyModal";
import {IUser} from "../models/IUser";
import UserService from "../services/UserService";

const ControlPanel: FC = () => {

    const [modal, setModal] = useState(false);
    const [users, setUsers] = useState<IUser[]>([])

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        }catch (e) {
            console.log(e)
        }
    }

    return (

        <Layout.Content style={{height: '100vh'}}>

                <Breadcrumb style={{ margin: '16px 0'}}>
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Create users
            </MyButton>

            <MyModal visible={modal} setVisible={setModal}>
                <CreateUser/>
            </MyModal>
                <MyButton style={{marginTop: 30, marginLeft: 7}}
                          onClick={() => getUsers()}>
                    Users list
                </MyButton>

                </Breadcrumb>

                <div className="site-layout-content" style={{ background: "white" }}>
                        {users.map(user =>
                        <div key={user.email}>{user.email}</div>
                            )}
                </div>
        </Layout.Content>
    );
};

export default ControlPanel;