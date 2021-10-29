import axios from "axios";
import React, { useEffect, useState } from "react";
import { useWeather } from "./Weather";
import environment from "../environment";
import he from "he";

const { INSULT_API, COMPLIMENT_API } = environment;

const MoodDialogue = () => {

    const [dialogue, setDialogue] = useState("");
    const weather = useWeather();

    const checkBadMood = (conditionCode: number = 1000) => {
        switch (conditionCode) {
            case 1000:
            case 1003:
                return false;
            default:
                return true;
        }
    };

    const setDialogueAsInsult = () => {
        axios.get(INSULT_API)
            .then(value => {
                setDialogue(he.decode(value.data.insult));
            });
    };

    const setDialogueAsCompliment = () => {
        axios.get(COMPLIMENT_API)
            .then(value => {
                setDialogue(value.data.compliment);
            });
    };

    useEffect(() => {
        const badMood = checkBadMood(weather?.currentWeather.code);
        if (badMood) {
            setDialogueAsInsult();
        } else setDialogueAsCompliment();
    }, [weather]);

    return (
        <div>
            {dialogue}
        </div>
    );

};

export default MoodDialogue;