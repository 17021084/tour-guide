import axios from "axios";

export default function ontologyAPI(name) {
  name = name
    .trim()
    .toLocaleLowerCase()
    .replace("đường", "")
    .replace("phố", "");
  // .replaceAll(" ", "_");
  const url = `http://ontweb-embedded.herokuapp.com/query?q=${name}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => {
        console.log("ontology Error");
        reject(err);
      });
  });
}
