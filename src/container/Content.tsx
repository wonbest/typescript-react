import * as React from "react";

import { Button } from "antd";

import Loadable from 'react-loadable';

const loading = <div>loading</div>

const LazyLoad = Loadable({
    loader: () => import("./LazyLoad"),
    loading: () => loading
})

// const LazyLoad = React.lazy(() => import("./LazyLoad"));

interface ContentProps {

}
interface ContentStates {
    lazy: any
}
export class Content extends React.Component<ContentProps, ContentStates> {

    constructor(props: ContentProps) {
        super(props);
        this.state = {
            lazy: null
        }
    }

    onClick = () => {
        this.setState({
            lazy: <LazyLoad />
        })
    }

    render() {
        return <div style={{ margin: 15 }}>
            <Button type="primary" onClick={this.onClick}>LoadComponent</Button>
            {this.state.lazy || ""}
        </div>
    }
}