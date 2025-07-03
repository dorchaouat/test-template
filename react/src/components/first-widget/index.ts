import reactToWebComponent from "react-to-webcomponent";
import { WeatherComponent } from "./component";
import React from "react";
import ReactDOM from "react-dom";

const MyComp = reactToWebComponent(WeatherComponent, React, ReactDOM);

customElements.define("first-widget", MyComp);
