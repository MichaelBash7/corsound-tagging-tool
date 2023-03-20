import React from 'react';
import {Space} from "antd";
import {Link} from "react-router-dom";
import {UserBase} from "../../../models/UserBase";

const EmailField = (record: UserBase) => {
    return (
        <Space size="middle">
            <Link to={"/admin/user/" + record.id}>{record.email}</Link>
        </Space>
    )
}

export default EmailField