import React from "react";
import Swal from "sweetalert2";
import infoIcon from '../assets/info.svg';
import '@sweetalert2/theme-borderless';
import './Info.css';

const Info = () => {

    const openInfo = () => {
        Swal.fire({
            iconHtml: '<img src="icon.png" width="175px" class="icon-image"/>',
            iconColor: 'transparent',
            titleText: 'About Moody Weather',
            html: `
                <p style='font-size: 1rem; text-align: left'>
                    The weather seems a little moody. 
                    Bad weather? Get insulted. Good weather? 
                    Get complimented. Make your bad days worse 
                    and your good days better.
                </p>
                
                <div style="font-size: 0.7rem; text-align: left;">
                    Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a>
                    <br/>
                    Insults by <a href="https://evilinsults.com/" title="Evil Insult Generator">Evilinsults.com</a>
                    <br/>
                    Compliments by <a href="https://complimentr.com/" title="Complimentr">Complimentr.com</a>
                </div>
                `,
            confirmButtonColor: '#4982c2',
            showClass: {
                popup: 'animate__animated animate__fadeIn animate__faster'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOut animate__faster',
            }
        });
    };

    return (
        <button className="plain-button" onClick={openInfo}>
            <img src={infoIcon} 
                width="20" 
                height="20"
                style={{
                padding: 5,
                opacity: 0.3
                }}
                alt="Information"/>
        </button>
    );
};

export default Info;