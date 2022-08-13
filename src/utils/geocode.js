const { default: axios } = require("axios");

const geocode = (address, callback) => {
  const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${encodeURI(
    address
  )}&format=json&limit=1`;

  const response = axios.get(url);
  response
    .then(({ data }) => {
      if (!data || data.length !== 0) {
        callback(undefined, data[0]);
      } else if (data.length === 0) {
        callback("Location not found ", undefined);
      }
    })
    .catch((err) => {
      callback("Internet Error", undefined);
    });
};

module.exports = { geocode };
