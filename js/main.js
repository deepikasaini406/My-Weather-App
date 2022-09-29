let iconUrl = 'http://openweathermap.org/img/wn/10d@2x.png';

let city = document.getElementById('city-name');
let country = document.getElementById('country-name');
let tempCurr = document.getElementById('temp-curr');
let iconCurr = document.getElementById('icon-curr');

async function getWeatherData(lat, lon){
   const apiKey = '1a8101ba2cc5b5fffb57c6c4866d5a94';
   const exclude = 'minutely,hourly'
   // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
   // const apiURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}`;
   const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
   const apiURLForcast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
   const response = await fetch(apiURL);
 	 const data = await response.json();
   console.log(data)

   const responseForecast = await fetch(apiURLForcast);
   const dataForecast = await responseForecast.json();
   console.log(dataForecast)

   city.innerText = data.name;
   country.innerText = data.sys.country;
   tempCurr.innerHTML = temperatureConverter(data.main.temp) + '<sup>&deg;</sup>';
   iconCurr.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
}

function temperatureConverter(valNum) {
  valNum = parseFloat(valNum);
  return (valNum-273.15).toFixed(0);
}

function getLatLong(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else { 
      alert("Geolocation is not supported by this browser.");
    }
}


const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
function success(pos) {
    const crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    getWeatherData(crd.latitude, crd.longitude)
}
  
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}  
  
getLatLong();