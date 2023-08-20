const queryParams = new URLSearchParams(window.location.search);
const countryName = queryParams.get("name");

fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`)
  .then(response => response.json())
  .then(data => {
    const country = data[0]; // Extracting country data from the response
    
    const mapsContainer = document.getElementById('maps-container');

    const [latitude, longitude] = country.latlng;

    // Construct the Google Maps iframe URL using latitude and longitude
    const iframeSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${latitude}!2d${longitude}`;

    // Create and embed the iframe
    const iframe = document.createElement('iframe');
    iframe.src = iframeSrc;
    iframe.width = '400';
    iframe.height = '300';
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;

    // Add the iframe to the container
    mapsContainer.appendChild(iframe);
  })
  .catch(error => console.error('Error fetching country data:', error));
