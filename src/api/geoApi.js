import axios from "axios";

export default function geoAPI(coord) {
  const url = `https://geocode.xyz/${coord.latitude},${coord.longitude}?geoit=json`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log("geoAPI Error");
        reject(err);
      });
  });
}
