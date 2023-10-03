var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([51.5, -0.09]).addTo(map);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        map.setView([position.coords.latitude, position.coords.longitude], 15);
        marker.setLatLng([position.coords.latitude, position.coords.longitude]);
      })
    }
var input = document.getElementById('search-input');
var searchBox = new google.maps.places.SearchBox(input, {});
searchBox.addListener('places_changed', () => {
  const place = searchBox.getPlaces()[0];
  //if (place == null) return;
  console.log(place.geometry.location.lat(), place.geometry.location.lng());
  map.setView([place.geometry.location.lat(), place.geometry.location.lng()], 15);
  marker.setLatLng([place.geometry.location.lat(), place.geometry.location.lng()]);
});

var googleMap = document.querySelector("#googleMap");
var googleMapPosition = {lat:51.5,lng:-0.09};
function initGoogleMaps() {
  var map = new google.maps.Map(googleMap, {zoom: 15, center: googleMapPosition});
  var marker = new google.maps.Marker({position: googleMapPosition, map: map});
}
initGoogleMaps();
async function getWeather() {
  let url = 'https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&units=metric&appid=175b41b3bf8da7b269f3f4c3f84526d9';
  const weatherResp = await fetch(url);
  const weatherJson = await weatherResp.json();
  console.log(weatherJson.main);
}
getWeather();