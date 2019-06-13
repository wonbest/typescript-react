import * as React from "react";
import * as ReactDom from "react-dom";

import { Content } from "./container/Content";

document.onreadystatechange = () => {
    ReactDom.render(<Content />, document.getElementById("app"))
}