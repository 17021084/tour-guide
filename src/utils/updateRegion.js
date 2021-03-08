export function updateRegion(marker, region) {
  let newRegion = { ...region };
  let update = false;
  const longBorder = Math.abs(region.longitude - marker.longitude);
  const latiBorder = Math.abs(region.latitude - marker.latitude);

  if (region.longitudeDelta < longBorder) {
    newRegion.longitude = marker.longitude;
    update = true;
  }
  if (region.latitudeDelta < latiBorder) {
    newRegion.latitude = marker.latitude;
    update = true;
  }
  if (update) {
    return newRegion;
  }
  return false;
}
