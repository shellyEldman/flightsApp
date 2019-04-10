let flightsData = [];

const outputTable = document.querySelector('#flight-table tbody');
const sectionTable = document.querySelector('section.table');
const btnLoad = document.querySelector('button.load');

document.querySelector('#destination').addEventListener('keyup', (e) => {
    const value = e.target.value;
    fetctData(value);
});

btnLoad.addEventListener('click', () => {
    fetctData('');
    sectionTable.classList.add('show');
    btnLoad.classList.add('hide');
});

document.querySelector('button.sort-dep').onclick = function () {
    flightsData.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.departure) - new Date(b.departure);
    });
    renderTable(flightsData);
};

document.querySelector('button.sort-ar').onclick = function () {
    flightsData.sort(function (a, b) {
        return new Date(a.arrival) - new Date(b.arrival);
    });
    renderTable(flightsData);
};

function fetctData (queryParam) {
    fetch(`flights.json?q=${queryParam}`)
    .then(res => res.json())
    .then(data => {
        flightsData = data;
        renderTable(flightsData);
    });
}

function renderTable(data) {
    outputTable.innerHTML = '';
    data.forEach(entry => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                    <td>${entry.id}</td>
                    <td>${entry.from}</td>
                    <td>${entry.to}</td>
                    <td>${entry.departure}</td>
                    <td>${entry.arrival}</td>
                    <td>${entry.by}</td>
                `;
        outputTable.appendChild(tr)
    });
}