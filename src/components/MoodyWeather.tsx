import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePosition } from "use-position";
import "./MoodyWeather.css";
import Loader from "./Loader";

type MoodyWeatherModel = {
    weather:  {
        location: {
            name: string,
            region: string,
            country: string
        },
        current: {
           condition: {
               text: string,
               icon: string,
               code: number
           },
           temp_f: number,
           temp_c: number,
           feelslike_c: number,
           feelslike_f: number,
           cloud: number,
           is_day: number
        }
    },
    dialogue: string
};

const MoodyWeather = ({tempUnit}: { tempUnit: 'f' | 'c' }) => {

    const [moodyWeather, setMoodyWeather] = useState<MoodyWeatherModel | undefined | null>();
    const { latitude, longitude, errorMessage } = usePosition(false);
    
    const loadMoodyWeather = (latitude: number, longitude: number, errorMessage: string) => {
        let q: string | number = 10001;

        if (latitude && longitude && !errorMessage) {
            q = `${latitude},${longitude}`;
        }

        axios.get(`${process.env.REACT_APP_API}/moody-weather`, {
            params: { q }
        }).then(response => {
            setMoodyWeather(response.data);
        });
    };

    useEffect(() => loadMoodyWeather(latitude!, longitude!, errorMessage!), [latitude, longitude, errorMessage]);

    return (
        <div>
            {moodyWeather ? 
            <>
            <div className="weather-card">
                <div className="condition-info">
                    <div className="condition-summary">
                        <div className="condition-temp">
                            {
                                tempUnit === 'f' ? 
                                    moodyWeather?.weather.current.temp_f :
                                    moodyWeather?.weather.current.temp_f
                            }&deg;
                        </div>
                        <div className="condition-icon-container">
                            <div className="condition-icon">
                                <img src={moodyWeather?.weather.current.condition.icon} 
                                    alt={moodyWeather?.weather.current.condition.text}/>
                            </div>
                            <div className="condition-text">
                                {moodyWeather?.weather.current.condition.text}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="location-info">
                    <div className="location-name">
                        {moodyWeather?.weather.location.name}
                    </div>
                    <div className="location-sub">
                        {moodyWeather?.weather.location.region}, {moodyWeather?.weather.location.country}
                    </div>
                </div>
            </div>
            <div className="speech-bubble">
                {moodyWeather?.dialogue}
            </div>
            </> : <Loader></Loader>}
        </div>
    );

};

export default MoodyWeather;