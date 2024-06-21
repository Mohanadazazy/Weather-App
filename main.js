let finalTemp;
let search = document.querySelector("#search")
// let location;
search.addEventListener("keyup",function(){
    getTemp(search.value);
})


async function getTemp(query){
    let temp = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1525ba3a7186472fbf2132649242106&q=${query}&days=3`)
    finalTemp = await temp.json()
    // console.log(finalTemp);
    displayForecast();
    // forecast.forecastday[1].date
}



function convertDateToDay(DD){
    const dateInput = DD;
    const date = new Date(dateInput);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = date.getDay();
    return days[dayIndex];
}

function convertDateToMonth(MM){
    const dateInput = MM;
    const date = new Date(dateInput);
    const months=[
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthIndex = date.getMonth()
    const num = date.getDate()
    
    return num + " " +months[monthIndex]
}

function displayForecast() {
    let conatiner=""

    container=`
             <div class="col-md-4">
                  <div class="time d-flex justify-content-between align-items-center w-100">
                      <p>${convertDateToDay(finalTemp.forecast.forecastday[0].date)}</p>
                      <p>${convertDateToMonth(finalTemp.forecast.forecastday[0].date)}</p>
                  </div>
                  <div class="details w-100 py-4 px-3">
                      <h4>${finalTemp.location.name}</h4>
                      <h2>${finalTemp.current.temp_c}<span>&#176;</span>C</h2>
                      <img src="${finalTemp.current.condition.icon}" alt="" width="90" height="90" class="d-inline-block align-text-top">
                      <p>${finalTemp.current.condition.text}</p>
                      <ul class="d-flex justify-content-between px-2">
                          <li class="">
                              <div class="d-flex align-items-center">
                                <img src="img/icon-umberella.png" alt="" width="21" height="21" class="d-inline-block align-text-top">
                                <p>20%</p>
                              </div>
                          </li>
                          <li class="">
                              <div class="d-flex align-items-center">
                                <img src="img/icon-wind.png" alt="" width="21" height="21" class="d-inline-block align-text-top">
                                <p>20%</p>
                              </div>
                          </li>
                          <li class="">
                              <div class="d-flex align-items-center">
                                <img src="img/icon-compass.png" alt="" width="21" height="21" class="d-inline-block align-text-top">
                                <p>20%</p>
                              </div>
                          </li>
                      </ul>
                  </div>
              </div>
              <div class="col-md-4 middle">
                  <div class="timediff d-flex justify-content-between align-items-center w-100">
                       <p>${convertDateToDay(finalTemp.forecast.forecastday[1].date)}</p>
                      <p>${convertDateToMonth(finalTemp.forecast.forecastday[1].date)}</p>
                  </div>
                  <div class="detailsdiff w-100 py-4 px-1 text-center py-5">
                    <img src="${finalTemp.forecast.forecastday[1].day.condition.icon}" alt="" width="48" height="48" class="d-inline-block align-text-top">
                    <h3 class="pt-3">${finalTemp.forecast.forecastday[1].day.maxtemp_c}<span>&#176;</span>C</h3>
                    <p>${finalTemp.forecast.forecastday[1].day.mintemp_c}<span>&#176;</span>C</p>
                    <span>${finalTemp.forecast.forecastday[1].day.condition.text}</span>
                  </div>
              </div>
              <div class="col-md-4">
                  <div class="time d-flex justify-content-between align-items-center w-100">
                      <p>${convertDateToDay(finalTemp.forecast.forecastday[2].date)}</p>
                      <p>${convertDateToMonth(finalTemp.forecast.forecastday[2].date)}</p>
                  </div>
                  <div class="detailsdiff w-100 py-4 px-1 text-center py-5">
                    <img src="${finalTemp.forecast.forecastday[2].day.condition.icon}" alt="" width="48" height="48" class="d-inline-block align-text-top">
                    <h3 class="pt-3">${finalTemp.forecast.forecastday[2].day.maxtemp_c}<span>&#176;</span>C</h3>
                    <p>${finalTemp.forecast.forecastday[2].day.mintemp_c}<span>&#176;</span>C</p>
                    <span>${finalTemp.forecast.forecastday[2].day.condition.text}</span>
                  </div>
              </div>
             
    
    `
    document.querySelector(".display").innerHTML=container;
}

function findUserLocation(){
    function success(position){
        const apiUrl=`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
        locationApi(apiUrl)
    }

    function error(){
        getTemp("london");
    }
    navigator.geolocation.getCurrentPosition(success , error)
}

async function locationApi(url){
    let geo = await fetch(url);
    let finalGeo = await geo.json();
    getTemp(finalGeo.city)
}
findUserLocation();
