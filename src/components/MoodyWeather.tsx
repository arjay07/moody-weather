import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { usePosition } from "use-position";
import "./MoodyWeather.css";
import "animate.css";

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

const MoodyWeather = ({tempUnit, degradeMode}: { tempUnit: 'f' | 'c', degradeMode: boolean }) => {

    const [moodyWeather, setMoodyWeather] = useState<MoodyWeatherModel | undefined | null>();
    const [loading, setLoading] = useState(false);
    const { latitude, longitude, errorMessage } = usePosition(false);
    
    useEffect(() => {
        setLoading(true);
        const loadMoodyWeather = (latitude: number, longitude: number, errorMessage: string) => {
            let q: string | undefined;
    
            if (latitude && longitude && !errorMessage) {
                q = `${latitude},${longitude}`;
            }
    
            axios.get(`${process.env.REACT_APP_API}/moody-weather`, {
                params: { q, degrading: degradeMode }
            }).then(response => {
                setMoodyWeather(response.data);
                setLoading(false);
            });
        };
        loadMoodyWeather(latitude!, longitude!, errorMessage!);
    }, 
    [latitude, longitude, errorMessage, degradeMode]);

    return (
        <div>
            {moodyWeather ? 
            <>
                <MoodyWeatherCard moodyWeather={moodyWeather} tempUnit={tempUnit}/> 
                {
                    loading ? 
                    <div style={{
                        width: "100vw",
                        height: "100vh",
                        display: "flex",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        top: 0,
                        left: 0
                    }}>
                        <Loader/>
                    </div> : null
                }
            </> 
            : <Loader/>}
        </div>
    );

};

export const MoodyWeatherCard = ({moodyWeather, tempUnit}:
    {
        moodyWeather: MoodyWeatherModel,
        tempUnit: 'f' | 'c'
    }) => {
    return (<><div className="weather-card">
        <div className="condition-info">
            <div className="condition-summary">
                <div className="condition-temp">
                    {
                        tempUnit === 'f' ? 
                            moodyWeather.weather.current.temp_f :
                            moodyWeather.weather.current.temp_f
                    }&deg;
                </div>
                <div className="condition-icon-container">
                    <div className="condition-icon">
                        <img src={moodyWeather.weather.current.condition.icon} 
                            alt={moodyWeather.weather.current.condition.text}/>
                    </div>
                    <div className="condition-text">
                        {moodyWeather.weather.current.condition.text}
                    </div>
                </div>
            </div>
        </div>
        <div className="location-info">
            <div className="location-name">
                {moodyWeather.weather.location.name}
            </div>
            <div className="location-sub">
                {moodyWeather.weather.location.region}, {moodyWeather.weather.location.country}
            </div>
        </div>
    </div>
    <div className="speech-bubble animate__animated animate__bounceIn aniamte__faster">
        {moodyWeather.dialogue}
    </div></>);
};

export default MoodyWeather;