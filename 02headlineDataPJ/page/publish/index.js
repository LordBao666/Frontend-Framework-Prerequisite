/**
 * 目标1：设置频道下拉菜单
 *  1.1 获取频道列表数据
 *  1.2 展示到下拉菜单中
 */
//check channel.js

/**
 * 目标2：文章封面设置
 *  2.1 准备标签结构和样式
 *  2.2 选择文件并保存在 FormData
 *  2.3 单独上传图片并得到图片 URL 网址
 *  2.4 回显并切换 img 标签展示（隐藏 + 号上传标签）
 */
document
  .querySelector(".cover .img-file")
  .addEventListener("change", async (event) => {
    //the user did not choose a file.
    if (event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    const fd = new FormData();
    fd.append("image", file);

    const res = await axios({
      url: "/v1_0/upload",
      method: "post",
      data: fd,
    });
    // console.log(res);
    const img = document.querySelector(".cover .rounded");
    img.src = res.data.data.url;
    img.classList.add("show");

    document.querySelector(".cover .place").classList.add("hide");
  });

/**
 * 目标3：发布文章保存
 *  3.1 基于 form-serialize 插件收集表单数据对象
 *  3.2 基于 axios 提交到服务器保存
 *  3.3 调用 Alert 警告框反馈结果给用户
 *  3.4 重置表单并跳转到列表页
 */
document.querySelector(".content .btn").addEventListener("click", async () => {
  const form = document.querySelector(".art-form");
  const data = serialize(form, { hash: true, empty: true });

  //add cover to data
  data.cover = {
    type: 1,
    images: [document.querySelector(".cover img").src],
  };

  const id =document.querySelector(".art-form input[name='id']").value;
  //post a article
  if ( id === "") {
    //when posting a new article, id need to be removed, because id
    //is created by the server not by the user
    delete data.id;
    try {
      const res = await axios({
        url: "/v1_0/mp/articles",
        method: "post",
        data,
      });
      myAlert(true, "文章发布成功");

      //forward to content
      setTimeout(() => {
        location.href = "../content/index.html";
      }, 1500);
    } catch (error) {
      console.dir(error);
      myAlert(false, error.response.data.message);
    }
  } //update a article
  else {
    try {
      const res = await axios({
        url: `/v1_0/mp/articles/${id}`,
        method: "put",
        data,
      });
      myAlert(true, "文章更新成功");


      //forward to content
      setTimeout(() => {
        location.href = `../content/index.html`;
      }, 1500);
    } catch (error) {
      console.dir(error);
      myAlert(false, error.response.data.message);
    }
  }
});
/**
 * 目标4：编辑-回显文章
 *  4.1 页面跳转传参（URL 查询参数方式）
 *  4.2 发布文章页面接收参数判断（共用同一套表单）
 *  4.3 修改标题和按钮文字
 *  4.4 获取文章详情数据并回显表单
 */
async function updatePublishContent() {
  const queryParams = location.search;
  const urlSearchParams = new URLSearchParams(queryParams);
  const id = urlSearchParams.get("id");

  //if true,it means we are editing a article existed before
  //and we should reshow its contents
  if (id) {
    //update index.html
    document.querySelector(".card .title span").textContent = "修改文章";
    document.querySelector(".art-form .btn").textContent = "更新";

    const res = await axios({
      url: `/v1_0/mp/articles/${id}`,
    });

    const data = res.data.data;
    //title
    document.querySelector("#title").value = data.title;

    //option
    for (const option of document.querySelector(".form-select").children) {
      if (option.value === `${data.channel_id}`) {
        option.selected = true;
      }
    }

    //image
    if (data.cover.images.length !== 0) {
      const img = document.querySelector(".cover .rounded");
      img.src = data.cover.images[0];
      img.classList.add("show");

      document.querySelector(".cover .place").classList.add("hide");
    }

    //editor
    editor.setHtml(data.content);

    //id
    const hiddenId = document.querySelector(".art-form input[name='id']");
    hiddenId.value = data.id;
  }
}
updatePublishContent();
/**
 * 目标5：编辑-保存文章
 *  5.1 判断按钮文字，区分业务（因为共用一套表单）
 *  5.2 调用编辑文章接口，保存信息到服务器
 *  5.3 基于 Alert 反馈结果消息给用户
 *
 *  我将代码写到了目标3
 */
