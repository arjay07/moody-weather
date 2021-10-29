import axios from "axios";
import React, { useEffect, useState } from "react";
import { usePosition } from "use-position";
import environment from "../environment";
import './Weather.css';

const { WEATHER_API_BASE, WEATHER_API_KEY } = environment;

export type WeatherInfo = {
    location: {
        name: string,
        region: string,
        country: string
    },
    currentWeather: {
        tempF: number,
        tempC: number,
        text: string,
        icon: string
    }
};

const Weather = (props: { tempUnit: 'f' | 'c' }) => {
    const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
    const { latitude, longitude, errorMessage } = usePosition(false);

    useEffect(() => {
        let q: any = 10001;

        if (!errorMessage && latitude && longitude) {
            q = `${latitude},${longitude}`;
        }

        axios.get(`${WEATHER_API_BASE}/current.json`, {
            params: {
                key: WEATHER_API_KEY,
                q
            }
        }).then(val => {
            if (val.data) {
                const data = val.data;
                setWeatherInfo({
                    location: data.location,
                    currentWeather: {
                        tempF: data.current.temp_f,
                        tempC: data.current.temp_c,
                        text: data.current.condition.text,
                        icon: data.current.condition.icon
                    }
                });
            }
        });
    });

    return (
        <div className="weather-card">
            <div className="condition-info">
                <div className="condition-summary">
                    <div className="condition-temp">
                        {
                            props.tempUnit === 'f' ? 
                                weatherInfo?.currentWeather.tempF :
                                weatherInfo?.currentWeather.tempC
                        }&deg;
                    </div>
                    <div className="condition-icon-container">
                        <div className="condition-icon">
                            <img src={weatherInfo?.currentWeather.icon} 
                                alt={weatherInfo?.currentWeather.text}/>
                        </div>
                        <div className="condition-text">
                            {weatherInfo?.currentWeather.text}
                        </div>
                    </div>
                </div>
            </div>
            <div className="location-info">
                <div className="location-name">
                    {weatherInfo?.location.name}
                </div>
                <div className="location-sub">
                    {weatherInfo?.location.region}, {weatherInfo?.location.country}
                </div>
            </div>
        </div>
    );
};

export default Weather;