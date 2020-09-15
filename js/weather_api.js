(function () {
let now_weather = document.getElementById("now_weather");
let weather_ico = document.getElementById("weather_ico");
let place = document.getElementById("place");
const API_KEY = "bc8e78a3cf0205fe741650acc31fb9e8";
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?q=";
const ICO_BASE_URL = "http://openweathermap.org/img/wn/";
let city = "tokyo";
let api_url = BASE_URL + city + "&APPID=" + API_KEY;
// http://api.openweathermap.org/data/2.5/weather?q=tokyo&APPID=bc8e78a3cf0205fe741650acc31fb9e8
let request = new XMLHttpRequest();

request.open('GET', api_url, true);
request.responseType = "json";
request.onload = function () {
    let data = this.response;
    console.log(data);

    let now_weather_info = data["weather"][0]["main"];
    switch (now_weather_info) {
        case "Clear":
            now_weather_info = "はれ";
            break;
        case "Clouds":
            now_weather_info = "くもり";
            break;
        case "Rain":
            now_weather_info = "あめ";
            break;
        case "Snow":
            now_weather_info = "ゆき！";
            break;
        case "Thunderstorm":
            now_weather_info = "らいう(こわい)";
            break;
        default:
            now_weather_info = "今日はおやすみ";
    }
    now_weather.innerText = "いまの天気は" + now_weather_info;

    let weather_ico_info = data["weather"][0]["icon"];
    let weather_ico_url = ICO_BASE_URL + weather_ico_info + "@2x.png";
    weather_ico.setAttribute("src", weather_ico_url);
}
}());

