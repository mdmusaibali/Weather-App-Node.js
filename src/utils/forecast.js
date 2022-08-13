const { default: axios } = require("axios");

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=9e81e8239665d976c85cfeecf15666ef&query=${lat},${lon}`;

  const response = axios.get(url);
  response
    .then(({ data }) => {
      if (!data || data.length !== 0) {
        callback(
          undefined,
          `It is currently ${data.current.temperature} °C. It feels like ${data.current.feelslike} °C out there.`
        );
      } else if (data.length === 0) {
        callback("Location not found ", undefined);
      }
    })
    .catch((err) => {
      callback("Internet Error", undefined);
    });
};

module.exports = { forecast };
