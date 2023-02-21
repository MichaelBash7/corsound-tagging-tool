import React, {useContext} from 'react';
import {Layout, Menu, Row} from "antd";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Navbar = () => {

    const {store} = useContext(Context)

    return (
        <div>
            <Layout.Header>
                {store.isAuth
                    ?
                    <Row justify="end">
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <div style={{color: 'white'}}>
                                {store.user.email}
                            </div>
                            <Menu.Item onClick={() => store.logout()}
                                       key={1}
                            >
                                Logout
                            </Menu.Item>
                        </Menu>
                    </Row>

                    :

                    <Menu theme="dark" mode="horizontal" selectable={false}>
                        <div style={{color: 'white'}} className="menu-div">
                            CORSOUND Tagging Tool
                        </div>
                    </Menu>
                }

            </Layout.Header>
        </div>
    );
};

export default observer (Navbar);