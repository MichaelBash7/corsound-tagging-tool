import React, {useContext} from 'react';
import {Layout, Menu, Row} from "antd";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import type {MenuProps} from 'antd';


const Navbar = () => {

    const {store} = useContext(Context)

    const getMenuItems = (): MenuProps['items'] => {
        if (!store.isAuth) {
            return [
                {key: '0', label: <div className="menu-div">CORSOUND Tagging Tool</div>},
            ]
        }

        let menuItems: MenuProps['items'] = []
        menuItems = menuItems.concat([
            {key: '1', label: <div className="menu-div">{store.user.email}</div>},
        ])
        if (store.user.isAdmin) {
            menuItems = menuItems.concat([
                {key: '2', label: <Link to="/admin/users">Users list</Link>},
                {key: '3', label: <Link to="/video">Tagging</Link>},
            ])
        }
        menuItems = menuItems.concat([
            {key: 'singOut', label: 'Sign out'},
        ])

        return menuItems
    }

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key === 'singOut') {
            store.logout()
        }
    }

    return (
        <Layout.Header>
            <Row justify="end">
                <Menu
                    onClick={onClick}
                    items={getMenuItems()}
                    theme="dark"
                    mode="horizontal"
                    selectable={false}
                    style={{minWidth: 500}}
                />
            </Row>
        </Layout.Header>
    );
};

export default observer(Navbar);