const weatherDisplay= document.querySelector(".weather");
const weatherForm=document.querySelector("#weather-form");
const cityInput=document.querySelector(".city-input");

//fetching weather from api

const fetchWeather=async (city)=>{
const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=17c5384ae34261be43af6ef992cbf360
`

const res=await fetch(url)
const data=await res.json()

if(data.cod==404){
    alert("city not found")
    return 
}
if(data.cod==401){
    alert("invalid api key")
    return;
}

const displayData={
    city:data.name,
    temp:data.main.temp
}
addWeatherToDom(displayData)
}

const addWeatherToDom =(data)=>{
    weatherDisplay.innerHTML=`
    <h1>weather in ${data.city}</h1>
    <h2>${data.temp} K</h2>
    `
    cityInput.value=""
}

//event listener for form submission

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(cityInput.value===""){
        alert("enter a city")
    }else{
        fetchWeather(cityInput.value)
    }

})

//initial fetch 
fetchWeather('miami')