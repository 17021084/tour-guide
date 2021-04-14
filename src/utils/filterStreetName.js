function capitalLetter(str) {
  str = str.split(" ");

  for (var i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");
}

export default function filterStreetName(streetName) {
  if (streetName) {
    streetName = streetName
      .toLowerCase()
      .replace("ngõ", "")
      .trim()
      .replace("phố", "")
      .trim()
      .replace("hẻm", "")
      .trim()
      .replace("đường", "")
      .trim();
    return capitalLetter(streetName.replace(/[0-9]/g, "").trim());
  }
}
