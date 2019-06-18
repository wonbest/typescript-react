import * as React from "react";

import { Button } from "antd";

import "../less/lessTest.less"

export default class LazyLoad extends React.Component<any, any> {
    render() {
        return <div style={{ margin: 15 }}>
            <div className="lessTest">less test</div>
            <Button type="primary">LazyLoadSuccess!</Button>
        </div>
    }
}