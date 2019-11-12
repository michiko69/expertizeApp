const createVenueHTML = (name, location, iconSource) => {
  return `<h2>${name}</h2>
  <img class="venueimage" src="${iconSource}"/>
  <h3>Address:</h3>
  <p style="font-size:17px; line-height: 1.5; margin-top: 5px">${location.formattedAddress}</p>`;
};
