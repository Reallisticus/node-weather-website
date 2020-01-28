const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationP = document.querySelector('#loc')
const forecastP = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    const url = '/weather?address=' + location;

    locationP.textContent = 'Loading...'
    
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationP.textContent = data.error;
            } else {
                locationP.textContent = data.location;
                forecastP.textContent = data.forecast;
            }
        })
    })
})