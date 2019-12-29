const weather = document.querySelector(".js-weather");

const API_KEY = '1e3ae659104ccc7d3ba7f55b097466be';
const COORDS = 'coords';

function getWeather(lat, lng) {
    // 데이터를 가져올때 사용하는 함수 fetch `` 를 사용한다
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
    // JSON.stringify : localStorage에 저장하려면 type이 string이어야 함으로 변경해주는 코드 
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 좌표 가져오기 성공시
function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        // Key : Value 값이 같을 경우 하나만 써도 된다
        // latitude : latitude, 
        // longitude : longitude
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("찾을수없습니다");
}

// 좌표 요청 함수
function askForCodes() {
    // navigator와 비슷한 함수 : window, document
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords() {
    const loadedCoodes = localStorage.getItem(COORDS);
    if(loadedCoodes === null) {
        askForCodes();
    } else {
        const parsedCoords = JSON.parse(loadedCoodes);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();