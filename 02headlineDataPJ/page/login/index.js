/**
 * 目标1：验证码登录
 * 1.1 在 utils/request.js 配置 axios 请求基地址
 * 1.2 收集手机号和验证码数据
 * 1.3 基于 axios 调用验证码登录接口
 * 1.4 使用 Bootstrap 的 Alert 警告框反馈结果给用户
 */

/**
 * @param {boolean} isLoginSuccess if login is successful
 * @param {string} message :the message to be shown on the screen
 */
function loginFeedback(isLoginSuccess,message){
  const alertDiv=document.querySelector(".alert");
  alertDiv.classList.add("show");
  let alerStr=isLoginSuccess?"alert-success":"alert-danger";
  alertDiv.classList.add(alerStr);
  alertDiv.textContent=message;

  //after 2 secs, alert div disappears
  setTimeout(()=>{
    alertDiv.classList.remove("show");
    alertDiv.classList.remove(alerStr);
  },2000);
}

const loginButton = document.querySelector(".login-form .btn");
loginButton.addEventListener("click", async (event) => {
  try {
    const form = document.querySelector(".login-form");
    const data = serialize(form, { hash: true, empty: true });
    const result = await axios({
      url: "/v1_0/authorizations",
      method:"post",
      data
    });
    loginFeedback(true,result.data.message);

  } catch (error) {
    loginFeedback(false,error.response.data.message);
  }
});
