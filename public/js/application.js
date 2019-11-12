const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// Page Elements
const $input1 = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$('#venue1'), $('#venue2'), $('#venue3'), $('#venue4'), $('#venue5')];


const getVenues = async () => {
  const data = {
    category: document.querySelector('#category').value,
  };

  const resp = await fetch('/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const found = await resp.json();
  const foundId = found.id;
  const { clientId, clientSecret } = found;

  const city = $input1.val();
  const urlToFetch = `${url + city}&categoryId=${foundId}&client_id=${clientId}&client_secret=${clientSecret}&v=20190808`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map((item) => item.venue);
      return venues;
    }
  } catch (error) {
    console.log(error);
  }
};

const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    const venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const executeSearch = () => {
  $venueDivs.forEach((venue) => venue.empty());
  $destination.empty();
  $container.css('visibility', 'visible');
  getVenues().then((venues) => renderVenues(venues));
  return false;
};

$submit.click(executeSearch);
