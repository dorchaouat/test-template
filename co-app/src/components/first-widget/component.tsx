import React from "react";
import PropTypes from "prop-types";
import { IWixSettings } from "./.settings.type";
import { IWixconfig } from "../../types";
import s from "./Style.scss";

export class WeatherComponent extends React.Component {
  static propTypes: {
    wixconfig: PropTypes.Validator<string>;
    wixsettings: PropTypes.Validator<string>;
  };

  state: { wixConfig: IWixconfig; wixSettings: IWixSettings };

  constructor(props) {
    super(props);

    this.state = {
      wixConfig: JSON.parse(props?.wixconfig || "{}"),
      wixSettings: JSON.parse(props?.wixsettings || "{}"),
    };
  }

  render() {
    const { wixConfig, wixSettings } = this.state;

    return (
      <div className={s.weatherWrapper}>
        <div className={s.weatherCard}>
          {wixSettings.toggle && <div className={s.weatherIconSun}></div>}
          <h1>26º C</h1>
          <p>Day Time</p>
        </div>
        <div className={s.weatherCard}>
          {wixSettings.toggle && <div className={s.weatherIconCloud}></div>}
          <h1>4º C</h1>
          <p>Night Time</p>
        </div>
        <div className={s.weatherCard}>
          <h1>60%</h1>
          <p>Humidity</p>
        </div>
      </div>
    );
  }
}

WeatherComponent.propTypes = {
  wixconfig: PropTypes.string.isRequired,
  wixsettings: PropTypes.string.isRequired,
};
