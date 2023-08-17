const queryParams = new URLSearchParams(window.location.search);
const countryName = queryParams.get("name");

fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`)
  .then(response => response.json())
  .then(data => {
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
 



    const countryCapitalElement = document.createElement("p");
    countryCapitalElement.textContent = `Capital: ${country.capital}`;
    countryDetails.appendChild(countryCapitalElement);

    const countryPopulationElement = document.createElement("p");
    countryPopulationElement.textContent = `Population: ${country.population}`;
    countryDetails.appendChild(countryPopulationElement);

    // You can add more elements for additional details
    const countryTimezoneElement = document.createElement("p");
    countryTimezoneElement.textContent = `Timezones: ${country.timezones}`;
    countryDetails.appendChild(countryTimezoneElement);
    
  })
  .catch(error => console.error("Error fetching country details:", error));
