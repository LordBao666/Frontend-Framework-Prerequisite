// axios 公共配置
// 基地址
axios.defaults.baseURL = "http://geek.itheima.net";

axios.interceptors.request.use(config => {
// Do something before request is sent
const token = localStorage.getItem("token");
if(token){
  config.headers.Authorization = `Bearer ${token}`;
}
return config;
},error => {
// Do something with request error
return Promise.reject(error);
});

axios.interceptors.response.use(response => {
// Do something before response is sent
return response;
},error => {
  //Identity authentication failed，redirect to login page
  if (error?.response?.status === 401) {
    alert("登录状态过期，请重新登录");
    localStorage.clear();
    location.href = "../login/index.html";
  }
  return Promise.reject(error);
});