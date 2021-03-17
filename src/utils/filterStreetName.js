export default function filterStreetName(streetName) {
  streetName = streetName
    .toLowerCase()
    .replace("ngõ", "")
    .trim()
    .replace("phố", "")
    .trim()
    .replace("hẻm", "")
    .trim()
    .replace("đường", "")
    .trim()
    return streetName.replace(/[0-9]/g, '').trim()
}

