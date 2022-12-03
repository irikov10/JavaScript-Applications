function solve() {
    let info = document.getElementById('info');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');

    let busStop = {
        next: 'depot'
    }

    function depart() {
        departBtn.disabled = true;
        let url = 'http://localhost:3030/jsonstore/bus/schedule';

        fetch(`${url}/${busStop.next}`)
            .then(response => response.json())
            .then(data => {
                busStop = JSON.parse(JSON.stringify(data));
                info.textContent = `Next stop ${busStop.name}`
            })
            .catch(error => console.log(error.message))

        arriveBtn.disabled = false;
    }

    function arrive() {
        arriveBtn.disabled = true;
        info.textContent = `Arriving at ${busStop.name}`
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();