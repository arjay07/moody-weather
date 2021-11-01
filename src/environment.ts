const api = process.env.REACT_APP_API;

const environment = {
    WEATHER_API: `${api}/moody-weather`,
    INSULT_API: `${api}/insult`,
    COMPLIMENT_API: `${api}/compliment`,
    VERSION: process.env.REACT_APP_VERSION
};

export default environment;