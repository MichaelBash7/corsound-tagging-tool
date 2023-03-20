import React from 'react';
import {Space, Typography} from "antd";

const {Text} = Typography;
const StatisticsField = (data: object) => {
    if (!data) return
    let list = []
    for (const [k, v] of Object.entries(data)) {
        list.push(<Text><>{k}: {v}</></Text>)
    }
    return (<Space direction="vertical">{list}</Space>)
}

export default StatisticsField;