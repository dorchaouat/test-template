import reactToWebComponent from "react-to-webcomponent";
import { WeatherComponent } from "./component";

const React = require("react");
const ReactDOM = require("react-dom");
const MyComp = reactToWebComponent(WeatherComponent, React, ReactDOM);

customElements.define("first-widget", MyComp);
