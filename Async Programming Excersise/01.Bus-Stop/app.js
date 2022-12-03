function getInfo() {
    const baseUrl = 'http://localhost:3030/jsonstore/bus/businfo';
    const inputElement = document.getElementById('stopId').value;
    const div = document.getElementById('stopName');
    const busesList = document.getElementById('buses');

    fetch(`${baseUrl}/${inputElement}`)
        .then(response => response.json())
        .then(data => {
            let buses = data.buses;
            let name = data.name;

            div.textContent = name;
            busesList.innerHTML = '';

            Object.keys(buses).forEach(bus => {
                let liElement = document.createElement('li');

                liElement.textContent = `Bus: ${bus} ${buses[bus]} minutes`;
                busesList.appendChild(liElement);
            })
        })
        .catch(error => {
            div.textContent = 'Error';
            busesList.innerHTML = '';
        })
}