import React from "react";
import Swal from "sweetalert2";
import infoIcon from '../assets/info.svg';
import 'animate.css';

const Info = () => {

    const openInfo = () => {
        Swal.fire({
            iconHtml: '<img src="icon.png" width="175px"/>',
            iconColor: 'transparent',
            titleText: 'About Moody Weather',
            html: `<p style='font-size: 1rem; text-align: left'>
            The weather seems a little moody. 
            Bad weather? Get insulted. Good weather? 
            Get complimented. Make your bad days worse 
            and your good days better.</p>`,
            confirmButtonColor: '#4982c2'
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