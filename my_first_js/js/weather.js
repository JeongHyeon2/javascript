const API_KEY = "05f1edc802d2726672e3cc1870872f08";


function onGeoOK(position){
    const lat = position.coords.latitude;   
    const lng = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    //js가 대신 방문해줌
    fetch(url).then(resopnse => resopnse.json()).then(data=>{
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}도`;
        city.innerText=data.name;
    }); //promise
}
function onGeoError(){
    alert("Can't find you. No weather for you!");
}
navigator.geolocation.getCurrentPosition(onGeoOK,onGeoError);