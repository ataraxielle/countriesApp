document.addEventListener("DOMContentLoaded", () => {
  const countryTable = document.getElementById("countryTable");
  const mapDiv = document.getElementById("map");
  const searchInput = document.getElementById("searchInput");
  let map = null;

  // Fetch country data from the API
  fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data => {
      const countries = data.map(country => country.name.common);

      // Populate the table with country names
      countries.forEach(countryName => {
        const row = countryTable.insertRow();
        const cell = row.insertCell();
        cell.textContent = countryName;
        cell.addEventListener("click", () => displayMap(countryName));
      });

      // Add event listener for search input
      searchInput.addEventListener("input", () => filterCountries(countries));
    })
    .catch(error => console.error("Error fetching data:", error));

  // Display the map for the selected country
  function displayMap(countryName) {
    if (map) {
      map.remove();
    }
  
    mapDiv.innerHTML = "";
    map = L.map("map").setView([0, 0], 2); 
  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
  
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => response.json())
      .then(data => {
        const country = data[0];
        if (country && country.latlng) {
          const [lat, lng] = country.latlng;
  
          map.setView([lat, lng], 6); 
          L.marker([lat, lng]).addTo(map);
        } else {
          console.error("No coordinates found for the selected country.");
        }
      })
      .catch(error => console.error("Error fetching country data:", error));
  }

  // Filter countries based on search input
  function filterCountries(countries) {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredCountries = countries.filter(country => country.toLowerCase().includes(searchTerm));

    countryTable.innerHTML = ""; // Clear the table

    filteredCountries.forEach(countryName => {
      const row = countryTable.insertRow();
      const cell = row.insertCell();
      cell.textContent = countryName;
      cell.addEventListener("click", () => displayMap(countryName));
    });
  }
});
