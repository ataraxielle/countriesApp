document.addEventListener("DOMContentLoaded", function () {
  const queryParams = new URLSearchParams(window.location.search);
  const countryName = queryParams.get("name");
  
  fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`)
    .then(response => response.json())
    .then(data => {
  
      // Country Details
      const countryDetails = document.getElementById("country-details");
  
      const country = data[0];
  
      const countryNameElement = document.getElementById("countryName");
      const countryBreadcrumb = document.getElementById("countryBreadcrumb");
      countryNameElement.textContent = country.name.common;
      countryBreadcrumb.textContent = country.name.common;
  
      const countryOfficialName = document.getElementById("officialName");
      countryOfficialName.textContent = country.name.official;
  
      const countryFlagElement = document.getElementById("flag");
      countryFlagElement.src = country.flags.png;
      countryFlagElement.alt = `${country.name.common} Flag`;
      countryFlagElement.classList.add("flag-image");

      const countryCOAElement = document.getElementById("coatOfArms");
      countryCOAElement.src = country.coatOfArms.png || "N/A";
      countryCOAElement.alt = `${country.name.common} Coat of Arms`;
      countryCOAElement.classList.add("coatOfArms-image");
  
      const countryCapitalElement = document.createElement("p");
      countryCapitalElement.textContent = `Capital: ${country.capital}`;
      countryDetails.appendChild(countryCapitalElement);
  
      const countryRegion = document.createElement("p");
      countryRegion.textContent = `Region: ${country.region}`;
      countryDetails.appendChild(countryRegion);
  
      const subRegion = document.createElement("p");
      subRegion.textContent = `SubRegion: ${country.subregion}`;
      countryDetails.appendChild(subRegion);
  
      const countryPopulationElement = document.createElement("p");
     
      const countryTimezoneElement = document.createElement("p");
      countryTimezoneElement.textContent = `Timezones: ${country.timezones}`;
      countryDetails.appendChild(countryTimezoneElement);

      
      
  
      // Additional Details
      const countryMoreDetails = document.getElementById("country-more");

      

      const countryLanguagesElement = document.createElement("p");
      countryLanguagesElement.textContent = `Languages: ${Object.values(country.languages).join(", ")}`;
      countryMoreDetails.appendChild(countryLanguagesElement);
  
      const countryCurrenciesElement = document.createElement("p");
      const currencies = Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`);
      countryCurrenciesElement.textContent = `Currencies: ${currencies.join(", ")}`;
      countryMoreDetails.appendChild(countryCurrenciesElement);
  
      const countryPostalCodeElement = document.createElement("p");
      const postalCodes = country.postalCode || "N/A";
      countryPostalCodeElement.textContent = `Postal Codes: ${postalCodes}`;
      countryMoreDetails.appendChild(countryPostalCodeElement);

      countryPopulationElement.textContent = `Population: ${country.population}`;
      countryMoreDetails.appendChild(countryPopulationElement);
  
  
 

    // Create a map
    const map = L.map("map").setView([country.latlng[0], country.latlng[1]], 5);

    // Add a tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Add a marker for the country's capital
    const capitalMarker = L.marker([country.latlng[0], country.latlng[1]]).addTo(map);
    capitalMarker.bindPopup(`<b>${country.capital}</b>`).openPopup();
  })
  .catch(error => console.error("Error fetching country details:", error));
});