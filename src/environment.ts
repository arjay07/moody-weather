const api = process.env.REACT_APP_API;

const environment = {
    WEATHER_API: `${api}/weather`,
    INSULT_API: `${api}/insult`,
    COMPLIMENT_API: `${api}/compliment`
};

export default environment;