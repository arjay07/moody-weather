import React from 'react';
import "animate.css";
import './SpeechBubble.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const SpeechBubble = ({ dialogue, onRefresh, isLoading }: { dialogue?: string, onRefresh?: () => void, isLoading: boolean }) => {

    const getDialogue = () => {
        if (dialogue) return dialogue;
    };

    return (
        <div className="speech-bubble animate__animated animate__bounceIn animate__faster">
            <div className="speech-bubble-content">
                <div className="speech-bubble-corner">
                    <button style={{
                        border: "none",
                        color: "#555"
                    }}
                    onClick = {onRefresh}>
                        <FontAwesomeIcon icon={faSyncAlt} spin={isLoading} />
                    </button>
                </div>
                {getDialogue()}
            </div>
        </div>
    );

};

export default SpeechBubble;