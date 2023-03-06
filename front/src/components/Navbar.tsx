import React, {useContext} from 'react';
import {Layout, Menu, Row} from "antd";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";


const Navbar = () => {

    const {store} = useContext(Context)

    return (
            <Layout.Header>
                {store.isAuth
                    ?
                    <Row justify="end">
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <div style={{color: 'white'}}>
                                {store.user.email}
                            </div>

                            {store.user.email === 'arkady.krishtul@corsound.ai' &&(
                            <Menu.Item key={1}>
                                <Link to="/control">Admin Panel</Link>
                            </Menu.Item>)}


                            <Menu.Item onClick={() => store.logout()}
                                       key={2}
                            >
                                Sign out
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
    );
};

export default observer (Navbar);