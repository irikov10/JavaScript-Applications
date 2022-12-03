function attachEvents() {
    const content = document.getElementById('content');
    const location = document.getElementById('location');
    const forecast = document.getElementById('forecast');
    const current = document.getElementById('current');
    const upcoming = document.getElementById('upcoming');
    const getWeatherBtn = document.getElementById('submit');
    const sunny = '&#x2600';
    const partlySunny = '&#x26C5';
    const overcast = '&#x2601';
    const rain = '&#x2614';
    const degrees = '&#176';
    let code = '';
    const divCurrent = document.createElement('div');
    const divUpcoming = document.createElement('div');

    getWeatherBtn.addEventListener('click', () => {
        divUpcoming.innerHTML = '';
        divCurrent.innerHTML = '';

        divCurrent.classList.add('forecasts');
        divUpcoming.classList.add('forecast-info');

        forecast.style.display = 'inline';

        fetch('http://localhost:3030/jsonstore/forecaster/locations')
            .then(response => response.json())
            .then(data => {
                data.forEach(locationObject => {
                    
                    if(locationObject.name == location.value) {
                        return code = locationObject.code
                    }

                })

                fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`)
                    .then(response => response.json())
                    .then(data => {
                        const symbolSpan = document.createElement('span');
                        symbolSpan.setAttribute('class', 'condition symbol')
                        const conditionSpan = document.createElement('span');
                        conditionSpan.classList.add('condition');
                        const locationSpan = document.createElement('span');
                        locationSpan.classList.add('forecast-data');
                        const degreesSpan = document.createElement('span');
                        degreesSpan.classList.add('forecast-data');
                        const weatherSpan = document.createElement('span');
                        weatherSpan.classList.add('forecast-data');

                        locationSpan.textContent = data.name;
                        degreesSpan.innerHTML = `${data.forecast.low}${degrees}/${data.forecast.high}${degrees}`;

                        weatherSpan.textContent = data.forecast.condition;

                        switch(data.forecast.condition) {
                            case 'Sunny': symbolSpan.innerHTML = sunny;
                            case 'Partly sunny': symbolSpan.innerHTML = partlySunny;
                            case 'Overcast': symbolSpan.innerHTML = overcast;
                            case 'Rain': symbolSpan.innerHTML = rain;
                        }

                        conditionSpan.appendChild(locationSpan);
                        conditionSpan.appendChild(degreesSpan);
                        conditionSpan.appendChild(weatherSpan);

                        divCurrent.appendChild(symbolSpan);
                        divCurrent.appendChild(conditionSpan);
                        current.appendChild(divCurrent);
                    })
                
                fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
                    .then(response => response.json())
                    .then(data => {
                        let nextDays = data.forecast;

                        nextDays.forEach(x => {
                            const symbolSpan = document.createElement('span');
                            symbolSpan.setAttribute('class', 'condition symbol')
                            const conditionSpan = document.createElement('span');
                            conditionSpan.classList.add('condition');
                            const locationSpan = document.createElement('span');
                            locationSpan.classList.add('forecast-data');
                            const degreesSpan = document.createElement('span');
                            degreesSpan.classList.add('forecast-data');
                            const weatherSpan = document.createElement('span');
                            weatherSpan.classList.add('forecast-data');

                            locationSpan.textContent = x.name;
                            degreesSpan.innerHTML = `${x.forecast.low}${degrees}/${x.forecast.high}${degrees}`;
    
                            weatherSpan.textContent = x.forecast.condition;

                            switch(x.forecast.condition) {
                                case 'Sunny': symbolSpan.innerHTML = sunny;
                                case 'Partly sunny': symbolSpan.innerHTML = partlySunny;
                                case 'Overcast': symbolSpan.innerHTML = overcast;
                                case 'Rain': symbolSpan.innerHTML = rain;
                            }
    
                            conditionSpan.appendChild(locationSpan);
                            conditionSpan.appendChild(degreesSpan);
                            conditionSpan.appendChild(weatherSpan);

                            divUpcoming.appendChild(symbolSpan);
                            divUpcoming.appendChild(conditionSpan);

                            upcoming.appendChild(divUpcoming)
                        })
                    })
            })
    })

}

attachEvents();