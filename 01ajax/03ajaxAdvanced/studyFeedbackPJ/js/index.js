/**
 * 目标1：完成省市区下拉列表切换
 *  1.1 设置省份下拉菜单数据
 *  1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
 *  1.3 切换城市，设置地区下拉菜单数据
 */

function addProvince(provinceValue, provinceTextContent) {
  const selectProvince = document.querySelector(".area-box .province");
  const option = document.createElement("option");
  option.value = provinceValue;
  option.textContent = provinceTextContent;
  selectProvince.appendChild(option);
}

/**
 * This function is to initialize the options
 * of province. There is a special option of
 * "省份" to suggest that the options are all
 * about provinces.
 */
async function initializeProvinces() {
  const provinceRes = await axios({
    url: "http://hmajax.itheima.net/api/province",
  });

  const selectProvince = document.querySelector(".area-box .province");
  selectProvince.innerHTML = "";
  // the special "省份" option is to remind the
  // users of what the options are
  addProvince("", "省份");

  for (const province of provinceRes.data.list) {
    addProvince(province, province);
  }
}

function addCity(cityValue, cityTextContent) {
  const selectCity = document.querySelector(".area-box .city");
  const option = document.createElement("option");
  option.value = cityValue;
  option.textContent = cityTextContent;
  selectCity.appendChild(option);
}

/**
 *
 * @param {Array} cityArr
 *
 * modify the city optioins.There is a
 * speacial option of "城市" to suggest
 * all options are about cities.
 */
function modifyCities(cityArr) {
  const selectCity = document.querySelector(".area-box .city");
  selectCity.innerHTML = "";
  // the special "城市" option is to remind the
  // users of what the options are
  addCity("", "城市");
  for (const city of cityArr) {
    addCity(city, city);
  }
}

function addArea(areaValue, areaTextContent) {
  const selectArea = document.querySelector(".area-box .area");
  const option = document.createElement("option");
  option.value = areaValue;
  option.textContent = areaTextContent;
  selectArea.appendChild(option);
}

/**
 *
 * @param {Array} areaArr
 *
 * modify the area options.There is a
 * special option of "地区" to suggest
 * all options are about areas
 */
function modifyAreas(areaArr) {
  const selectArea = document.querySelector(".area-box .area");
  selectArea.innerHTML = "";
  // the special "地区" option is to remind the
  // users of what the options are
  addArea("", "地区");
  for (const area of areaArr) {
    addArea(area, area);
  }
}

initializeProvinces();
let pname = "北京";
let cname = "北京市";
let area = "东城区";

const selectProvince = document.querySelector(".area-box .province");
selectProvince.addEventListener("change", async (event) => {
  pname = event.target.value;
  try {
    //if pname="", it means the user are clicking on the "省份" option
    if (pname === "") {
      document.querySelector(".area-box .city").innerHTML = "";
      addCity("", "城市");
      document.querySelector(".area-box .area").innerHTML = "";
      addArea("", "地区");
      return;
    }

    const result = await axios({
      url: "http://hmajax.itheima.net/api/city",
      params: {
        pname,
      },
    });
    modifyCities(result.data.list);
    document.querySelector(".area-box .area").innerHTML = "";
    addArea("", "地区");
  } catch (error) {
    console.log(error);
  }
});

const selectCity = document.querySelector(".area-box .city");
selectCity.addEventListener("change", async (event) => {
  cname = event.target.value;
  try {
    //if cname="", it means the user are clicking on the "城市" option
    if (cname === "") {
      document.querySelector(".area-box .area").innerHTML = "";
      addArea("", "地区");
      return;
    }
    const result = await axios({
      url: "http://hmajax.itheima.net/api/area",
      params: {
        pname,
        cname,
      },
    });
    modifyAreas(result.data.list);
  } catch (error) {
    console.log(error);
  }
});

const button = document.querySelector(".submit");
button.addEventListener("click", async () => {
  try {
    const form = document.querySelector(".info-form");
    const data = serialize(form, { hash: true, empty: true });
    const result = await axios({
      url: "http://hmajax.itheima.net/api/feedback",
      method: "post",
      data
    });
    console.log(result);
  } catch (error) {
    console.dir(error);
  }
});
