const queryParams = new URLSearchParams(window.location.search);
const countryName = queryParams.get("name");

fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`)
  .then(response => response.json())
  .then(data => {
    const country = data[0]; // Extracting country data from the response
    const mapsContainer = document.getElementById('maps-container');

    const [latitude, longitude] = country.latlng;

    // Create a Leaflet map centered on the specified latitude and longitude
    const map = L.map('maps-container').setView([latitude, longitude], 5);

    // Add a tile layer to the map (you can choose a different tile layer if you prefer)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker to the map at the specified latitude and longitude
    L.marker([latitude, longitude]).addTo(map)
      .bindPopup(`<b>${countryName}</b><br>Latitude: ${latitude}<br>Longitude: ${longitude}`)
      .openPopup();
  })
  .catch(error => console.error('Error fetching country data:', error));
