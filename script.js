// Fetch data from the API
fetch("https://restcountries.com/v3.1/all")
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById("table-body");
    data.forEach(country => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.textContent = country.name.common;
      row.appendChild(nameCell);
      
      const capitalCell = document.createElement("td");
      capitalCell.textContent = country.capital;
      row.appendChild(capitalCell);
      
      const populationCell = document.createElement("td");
      populationCell.textContent = country.population;
      row.appendChild(populationCell);

      // Add more cells for additional columns

      // Add a clickable UI element
      row.addEventListener("click", () => {
        window.location.href = `country.html?name=${encodeURIComponent(country.name.common)}`;
      });

      tableBody.appendChild(row);
    });
  })
  .catch(error => console.error("Error fetching data:", error));
