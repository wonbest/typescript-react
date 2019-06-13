import * as React from "react";

import { Button } from "antd";

export default class LazyLoad extends React.Component<any, any> {
    render() {
        return <div style={{ margin: 15 }}>
            <Button type="primary">LazyLoadSuccess!</Button>
        </div>
    }
}