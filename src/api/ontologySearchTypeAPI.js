import axios from "axios";

export default function ontologySearchTypeAPI(type) {
  
  const url = `http://ontweb-embedded.herokuapp.com/query?t=${type}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => resolve(res.data))
      .catch((err) => {
        console.log("types error :",type);
        reject(err);
      });
  });
}
