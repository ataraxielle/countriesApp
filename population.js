
const apiUrl = 'https://restcountries.com/v3.1/all';
const populationChart = document.getElementById('populationChart').getContext('2d');

// Fetch data from API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {

        const countries = data.map(country => ({
            name: country.name.common,
            population: country.population,
            continent: country.region, 
        }));


        const continentPopulations = {};
        countries.forEach(country => {
            if (!continentPopulations[country.continent]) {
                continentPopulations[country.continent] = 0;
            }
            continentPopulations[country.continent] += country.population;
        });

        createChartAndTable(continentPopulations);
    })
    .catch(error => console.error('Error fetching data:', error));

function createChartAndTable(data) {
    const continentNames = Object.keys(data);
    const continentPopulations = Object.values(data);
    new Chart(populationChart, {
        type: 'bar',
        data: {
            labels: continentNames,
            datasets: [{
                label: 'Population',
                data: continentPopulations,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderWidth: 1,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Population',
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'Continent',
                    },
                },
            },
        },
    });

    // Create table rows
    const tableBody = document.querySelector('#populationTable tbody');
    tableBody.innerHTML = ''; 

    continentNames.forEach((continent, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${continent}</td>
            <td>${continentPopulations[index]}</td>
        `;
        tableBody.appendChild(row);
    });
}
