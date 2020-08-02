document.addEventListener(`DOMContentLoaded`, function () {

    let h1 = document.querySelector('h1');
    let img = document.querySelector('img');
    let city = document.querySelector('.city');
    let realFeel = document.querySelector('.realFeel');
    let windDirection = document.querySelector('.windDirection');
    let windSpeed = document.querySelector('.windSpeed');
    let forCreated = document.querySelector('.forCreated');
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api.openweathermap.org/data/2.5/onecall?lat=53.893009&lon=27.567444&units=metric&appid=40cf26743d4304676c3a84ca14111f65');
    xhr.responseType = 'json';
    xhr.onload = function () {
        if (xhr.status != 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            console.log(xhr.response);
            let weatherObj = xhr.response;
            let date = new Date(weatherObj.current.dt * 1000);
            let hours = date.getHours();
            let minutes = "0" + date.getMinutes();
            let formattedTime = hours + ':' + minutes.substr(-2);
            h1.textContent = Math.floor(weatherObj.current.temp) + ' °C ';
            city.textContent = weatherObj.timezone.split('/')[1] + ': ' + formattedTime;
            realFeel.textContent = 'Feels like ' + weatherObj.current.feels_like + ' °C ';
            let icon = weatherObj.current.weather[0].icon;
            img.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);
            let val = Math.floor(weatherObj.current.wind_deg / 45);
            let arr = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"]
            windDirection.textContent = arr[val];
            windSpeed.textContent = weatherObj.current.wind_speed + ' m/s';

            for(let i = 1; i <=5; i++) {
                let forecastDate = new Date(weatherObj.daily[i].dt * 1000);
                let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                let month = months[forecastDate.getMonth()];
                let currentDate = forecastDate.getDate();
                let forecastIcon = weatherObj.daily[i].weather[0].icon;
                let forecastImg = document.createElement('img');
                let forecastDiv = document.createElement('div');
                forecastDiv.classList.add('newdiv');
                forecastImg.setAttribute('src', `http://openweathermap.org/img/wn/${forecastIcon}@2x.png`);
                forecastDiv.append(forecastImg);
                forecastDiv.prepend(currentDate + ' ' +  month);
                forecastDiv.append(Math.floor(weatherObj.daily[i].temp.day) +' °C ');
                forCreated.append(forecastDiv);
            }
        }
    };

    xhr.onerror = function () {
        alert("Запрос не удался");
    };

    xhr.send();



});