/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */

/**
 * @param  data is response.data from the backend server.
 * We use this method to modify top-box in html.
 */
function modifyTopBox(data) {
  document.querySelector(".top-box .dateShort").textContent = data.dateShort;
  document.querySelector(".top-box .dateLunar").textContent = data.dateLunar;
  document.querySelector(".top-box .area").textContent = data.area;
}

/**
 * @param  data is response.data from the backend server.
 * We use this method to modify weather-box in html.
 */
function modifyWeatherBox(data) {
  document.querySelector(".weather-box .temperature").textContent =
    data.temperature;
  document.querySelector(".weather-box .psPm25").textContent = data.psPm25;
  document.querySelector(".weather-box .psPm25Level").textContent =
    data.psPm25Level;
  document.querySelector(".weather-box .weatherImg").src = data.weatherImg;
  document.querySelector(".weather-box .weather").textContent = data.weather;
  document.querySelector(".weather-box .windDirection").textContent =
    data.windDirection;
  document.querySelector(".weather-box .windPower").textContent =
    data.windPower;
}

/**
 * @param  data is response.data from the backend server.
 * We use this method to modify today weather in html.
 */
function modifyTodayWeather(data) {
  document.querySelector(".today-weather .weather").textContent =
    data.todayWeather.weather;
  document.querySelector(".today-weather .temNight").textContent =
    data.todayWeather.temNight;
  document.querySelector(".today-weather .temDay").textContent =
    data.todayWeather.temDay;
  document.querySelector(".today-weather .ultraviolet").textContent =
    data.todayWeather.ultraviolet;
  document.querySelector(".today-weather .humidity").textContent =
    data.todayWeather.humidity;
  document.querySelector(".today-weather .sunriseTime").textContent =
    data.todayWeather.sunriseTime;
  document.querySelector(".today-weather .sunsetTime").textContent =
    data.todayWeather.sunsetTime;
}

/**
 * @param  data is response.data from the backend server.
 * We use this method to modify week Weather in html.
 */
function modifyweekWeatherBox(data) {
  const listList = [
    ...document.querySelectorAll(".week-weather-box .week-wrap>li"),
  ];
  const weekWeatherList = data.dayForecast;
  for (let i = 0; i < listList.length; i++) {
    listList[i].querySelector(".dateFormat").textContent =
      weekWeatherList[i].dateFormat;
    listList[i].querySelector(".date").textContent = weekWeatherList[i].date;

    listList[i].querySelector(".weatherImg").src =
      weekWeatherList[i].weatherImg;
    listList[i].querySelector(".temNight").textContent =
      weekWeatherList[i].temNight;
    listList[i].querySelector(".temDay").textContent =
      weekWeatherList[i].temDay;
    listList[i].querySelector(".windDirection").textContent =
      weekWeatherList[i].windDirection;
    listList[i].querySelector(".windPower").textContent =
      weekWeatherList[i].windPower;
  }
}

/**
 *
 * @param {string} city is code for one city, for example,110100 is for 北京. 
 *
 * This function is to modify the front web page 
 * according to @param {string} city
 */
function getWeatherByCityCode(city) {
  myAxios({
    url: "http://hmajax.itheima.net/api/weather",
    method: "get",
    params: {
      city,
    },
  })
    .then((result) => {
      // console.log(result);
      // console.log(result.data);
      modifyTopBox(result.data);
      modifyWeatherBox(result.data);
      modifyTodayWeather(result.data);
      modifyweekWeatherBox(result.data);
    })
    .catch((error) => {
      console.dir(error);
    });
}



/**
 *
 * @param  data is response.data  from the backend server.
 * This function is to show the city list.
 */
function showSearchCity(data) {
  const ul=document.querySelector(".top-box .search-list");
  ul.innerHTML="";
  for( const obj of data){
    const newLi = document.createElement("li");
    newLi.classList.add("city-item");
    newLi.dataset.cityCode=obj.code;//add data-* property.
    newLi.textContent = obj.name;
    ul.appendChild(newLi);
  }
}

/**
 * @param {string} keyName.
 * This function is to  seach cities by keyName and
 * show them in browser.
 */
function getCityListByKeyName(keyName) {
  myAxios({
    url: "http://hmajax.itheima.net/api/weather/city",
    method: "get",
    params: {
      city: keyName,
    },
  })
    .then((result) => {
      showSearchCity(result.data);
    })
    .catch((error) => {
      console.dir(error);
    });
}

/**
 * This function is a genenal method to debounce when inputing too
 * much frequently.
 * @param {Function} func
 * @param {Number} delay the unit is ms
 */
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 *
 * @param {Number} delay the unit is ms
 * To prevent searching the cites too much frequently,We
 * add debouncing to input.
 */
function searchCityWithDebounce(delay) {
  const input = document.querySelector(".top-box .search-city");
  const debouceFunc = (event) => {
    getCityListByKeyName(event.target.value);
  };
  input.addEventListener("input", debounce(debouceFunc,delay));
}


/**
 * This function it to show the weather of which the user 
 * click on the search list.
 */
function showWeatherWhenClickSearchList(){
  const list =document.querySelector(".top-box .search-list");
  list.addEventListener("click",(event)=>{
    //if event.target is li. 
    if (event.target.classList.contains("city-item")) {// event.target.nodeName=="LI" also works
      getWeatherByCityCode(event.target.dataset.cityCode);// pass  "data-city-code" property. 
    }
  });

}



function main() {
  //The initial  page is the weather of 北京市，and 110100 is cityCode of 北京市. 
  getWeatherByCityCode("110100");

  //0.5 sec for debouncing
  searchCityWithDebounce(500);
  showWeatherWhenClickSearchList();
}

main();
