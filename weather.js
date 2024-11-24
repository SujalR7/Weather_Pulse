let weathercity=document.querySelector(".weather_city");
let dateTime=document.querySelector(".weather_date_time");
let forecast=document.querySelector(".weather_forecast");
let temperature=document.querySelector(".weather_temperature");
let icon=document.querySelector(".weather_icon");
let mintemp=document.querySelector(".weather_min");
let maxtemp=document.querySelector(".weather_max");
let feels=document.querySelector(".feelsLike");
let humidity=document.querySelector(".weather_humidity");
let wind=document.querySelector(".weather_wind");
let pressure=document.querySelector(".weather_pressure");
let citysearch=document.querySelector(".weather_search");
let sunrise=document.querySelector(".sunrise");
let sunset=document.querySelector(".sunset");

const getcountry=(co)=>{
return new Intl.DisplayNames([co], { type: "region" }).of(co);
//let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
//regionNames.of("419")
}
const getDateTime=(dt)=>{
    const currdate=new Date(dt*1000);
    console.log(currdate);
    const options={
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric"
    }
    const formatter=new Intl.DateTimeFormat("en-US",options);
    const formattedDate=formatter.format(currdate);
    return formattedDate;
}
const getDate=(dt)=>{
    const currdate=new Date(dt*1000);
    console.log(currdate);
    const options={
        hour:"numeric",
        minute:"numeric",
    }
    const formatter=new Intl.DateTimeFormat("en-US",options);
    const formattedDate=formatter.format(currdate);
    return formattedDate;
}
let city="pune";
citysearch.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=document.querySelector(".city_name");
    console.log(cityName.value);
    city=cityName.value;
    getWeatherData();
    cityName.value="";
});
const getWeatherData=async()=>{
    console.log("hi")
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3fc427311a1485047ba91cedfdea28f2`;
    try{
        const response=await fetch(url);
        const data=await response.json();
        console.log(data);
        const{main,name,weather,wind,sys,dt}=data;
        console.log(name,sys.country);
        weathercity.innerHTML=`${name},${getcountry(sys.country)}`;
        dateTime.innerHTML=getDateTime(dt);
        temperature.innerHTML=`${(main.temp-273.15).toFixed(2)}&#176`
        mintemp.innerHTML=`Min:${(main.temp_min-273.15).toFixed()}&#176`;
        maxtemp.innerHTML=`Max:${(main.temp_max-273.15).toFixed()}&#176`;
        feels.innerHTML=`${(main.feels_like-273.15).toFixed()}&#176`;
        humidity.innerHTML=`${main.humidity}%`;
        wind.innerHTML=`${wind.speed}m/s`;
        pressure.innerHTML=`${main.pressure} hPa`;
        forecast.innerHTML=`${weather[0].main}`;
        sunrise.innerHTML="Sunrise:"+getDate(sys.sunrise);
        sunset.innerHTML="Sunset:"+getDate(sys.sunset)
        icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;
    }
    catch(error)
    {
        console.log(error);
    }
}
document.body.addEventListener('load',getWeatherData());