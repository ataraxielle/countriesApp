// Fetch data from the API
fetch("https://restcountries.com/v3.1/all")
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById("table-body");
    const filterInput = document.getElementById("filter-input");
    const sortSelect = document.getElementById("sort-select");

    function updateTable(filter, sortBy) {
      tableBody.innerHTML = ""; // Clear existing data
      
      const filteredData = data.filter(country => {
        const countryName = country.name.common.toLowerCase();
        return countryName.includes(filter.toLowerCase());
      });
      
      const sortedData = filteredData.sort((a, b) => {
        if (sortBy === "name") {
          return a.name.common.localeCompare(b.name.common);
        } else if (sortBy === "population") {
          return a.population - b.population;
        }
        
        return 0; 
      });
      
      sortedData.forEach(country => {
        
        const row = document.createElement("tr");
        const flagCell = document.createElement("td");
        const flag = document.createElement("img");
        flag.src = country.flags.png;
        flag.alt = `${country.name.common} Flag`;
        flag.width = '250';
        row.appendChild(flag);
          
        row.appendChild(flagCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = country.name.common;
        row.appendChild(nameCell);
        
        const capitalCell = document.createElement("td");
        capitalCell.textContent = country.capital;
        row.appendChild(capitalCell);
        
        const populationCell = document.createElement("td");
        populationCell.textContent = country.population;
        row.appendChild(populationCell);
        

        const buttonCell = document.createElement("td");
        const button = document.createElement("button");
        button.textContent = "View";
        button.id = "viewBtn"
        button.addEventListener("click", () => {
          window.location.href = `country.html?name=${encodeURIComponent(country.name.common)}`;
        });
        buttonCell.appendChild(button);
        row.appendChild(buttonCell);
        
        tableBody.appendChild(row);
      });
    }
    
    // Initial data rendering
    updateTable("", "name"); // Default sorting by name
    
    // Update data on filter input change
    filterInput.addEventListener("input", () => {
      const filterValue = filterInput.value;
      const sortValue = sortSelect.value;
      updateTable(filterValue, sortValue);
    });
    
    // Update data on sort select change
    sortSelect.addEventListener("change", () => {
      const filterValue = filterInput.value;
      const sortValue = sortSelect.value;
      updateTable(filterValue, sortValue);
    });
  })
  .catch(error => console.error("Error fetching data:", error));
