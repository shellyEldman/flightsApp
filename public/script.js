let flightsData = [];

const outputTable = document.querySelector('#flight-table tbody');
const sectionTable = document.querySelector('section.table');
const btnLoad = document.querySelector('button.load');

btnLoad.addEventListener('click', () => {
    fetch('flights.json')
        .then(res => res.json())
        .then(data => {
            flightsData = data;
            renderTable(flightsData, outputTable);
        });
    sectionTable.classList.add('show');
    btnLoad.classList.add('hide');
});

document.querySelector('button.sort-dep').onclick = function () {
    flightsData.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.departure) - new Date(b.departure);
    });
    outputTable.innerHTML = '';
    renderTable(flightsData, outputTable);
};

document.querySelector('button.sort-ar').onclick = function () {
    flightsData.sort(function (a, b) {
        return new Date(a.arrival) - new Date(b.arrival);
    });
    outputTable.innerHTML = '';
    renderTable(flightsData, outputTable);
};


function renderTable(data, target) {
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
        target.appendChild(tr)
    });
}