import reactToWebComponent from "react-to-webcomponent";
import { WeatherComponent } from './Component';

const React = require('react');
const ReactDOM = require('react-dom');
const MyComp = reactToWebComponent(WeatherComponent, React, ReactDOM);

customElements.define("weather-component", MyComp);