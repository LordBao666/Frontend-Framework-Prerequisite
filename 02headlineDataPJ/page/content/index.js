/**
 * 目标1：获取文章列表并展示
 *  1.1 准备查询参数对象
 *  1.2 获取文章列表数据
 *  1.3 展示到指定的标签结构中
 */

/**
 *
 * @param {number} status
 * if status = 1, return 待审核；
 * if status = 2，return 审核通过
 * we don't care about other illegal statuses
 */
function getArticleStatusString(status) {
  if (status === 1) {
    return "待审核";
  }
  if (status === 2) {
    return "审核通过";
  }
  return "文章处于非法状态";
}

/**
 *
 * @param {number} status
 * if status = 1, return text-bg-primary；
 * if status = 2，return text-bg-success;
 * we don't care about other illegal statuses
 */
function getArticleStatusStyle(status) {
  if (status === 1) {
    return "text-bg-primary";
  }
  if (status === 2) {
    return "text-bg-success";
  }
  return "";
}

/**
 *
 * @param {*} article
 *
 * This function is to display the contents of an article
 */
function showOneArticle(article) {
  const artList = document.querySelector(".art-list");
  const tr = document.createElement("tr");
  //cover
  const coverTd = document.createElement("td");
  const coverImg = document.createElement("img");
  if (article.cover.images.length !== 0) {
    coverImg.src = article.cover.images[0];
  }
  coverImg.alt = "";
  coverTd.appendChild(coverImg);
  tr.appendChild(coverTd);

  //title
  const titleTd = document.createElement("td");
  titleTd.textContent = article.title;
  tr.appendChild(titleTd);

  //status
  const statusTd = document.createElement("td");
  const statusSpan = document.createElement("span");
  statusSpan.classList.add("badge");
  statusSpan.classList.add(getArticleStatusStyle(article.status));
  statusSpan.textContent = getArticleStatusString(article.status);
  statusTd.appendChild(statusSpan);
  tr.appendChild(statusTd);

  //publish time
  const publishDateTd = document.createElement("td");
  const publishDateSpan = document.createElement("span");
  publishDateSpan.textContent = article.pubdate;
  publishDateTd.appendChild(publishDateSpan);
  tr.appendChild(publishDateTd);

  //read count
  const readCountTd = document.createElement("td");
  const readCountSpan = document.createElement("span");
  readCountSpan.textContent = article.read_count;
  readCountTd.appendChild(readCountSpan);
  tr.appendChild(readCountTd);

  //comment count
  const commentCountTd = document.createElement("td");
  const commentCountSpan = document.createElement("span");
  commentCountSpan.textContent = article.comment_count;
  commentCountTd.appendChild(commentCountSpan);
  tr.appendChild(commentCountTd);

  //like count
  const likeCountTd = document.createElement("td");
  const likeCountSpan = document.createElement("span");
  likeCountSpan.textContent = article.like_count;
  likeCountTd.appendChild(likeCountSpan);
  tr.appendChild(likeCountTd);

  //action
  const actionTd = document.createElement("td");
  actionTd.dataset.id = article.id;
  const editI = document.createElement("i");
  editI.classList.add("bi");
  editI.classList.add("bi-pencil-square");
  editI.classList.add("edit");
  actionTd.appendChild(editI);

  const deleteI = document.createElement("i");
  deleteI.classList.add("bi");
  deleteI.classList.add("bi-trash3");
  deleteI.classList.add("del");
  actionTd.appendChild(deleteI);

  tr.appendChild(actionTd);
  artList.appendChild(tr);
}

class PageQueryObj {
  status; //"1" for pending review, "2" for review passed, "" for all
  channel_id; //spcial "" for all
  page; //current page(start from 1)
  per_page; //the size of per page

  constructor(status = "", channel_id = "", page = 1, per_page = 2) {
    this.status = status;
    this.channel_id = channel_id;
    this.page = page;
    this.per_page = per_page;
  }
}

//total count under condition of status and channel
let totalCount;

let lastQueryObj;

/**
 * 
 * @param {PageQueryObj} queryObj 
 * for example
 * {
    status: "", //"1" for pending review, "2" for review passed, "" for all
    channel_id: "", //spcial "" for all
    page: 1, //current page(start from 1)
    per_page: 4, //the size of per page
  };
 */
async function showArticleList(queryObj) {
  const res = await axios({
    url: "/v1_0/mp/articles",
    params: queryObj,
  });
  //update  content management
  const raidoButtons = document.querySelectorAll("input[name='status']");
  for (const raidoButton of raidoButtons) {
    if (raidoButton.value === queryObj.status) {
      raidoButton.checked = true;
    }
  }
  for (const option of document.querySelector(".form-select").children) {
    if (option.value === `${queryObj.channel_id}`) {
      option.selected = true;
    }
  }

  //update article content
  document.querySelector(".art-list").innerHTML = "";

  for (const article of res.data.data.results) {
    showOneArticle(article);
  }
  lastQueryObj = queryObj;
  sessionStorage.setItem("lastQueryObj", JSON.stringify(lastQueryObj));
  totalCount = res.data.data.total_count;

  //update page content
  const currentPage = document.querySelector(".page-item.page-now");
  currentPage.textContent = `第${queryObj.page}页`;
  document.querySelector(".total-count").textContent = `共${totalCount}条`;
}

function initializeArticleList() {
  let lastQueryObj = sessionStorage.getItem("lastQueryObj");
  let queryObj = lastQueryObj ? JSON.parse(lastQueryObj) : new PageQueryObj();
  showArticleList(queryObj);
}

initializeArticleList();

/**
 * 目标2：筛选文章列表
 *  2.1 设置频道列表数据
 *  2.2 监听筛选条件改变，保存查询信息到查询参数对象
 *  2.3 点击筛选时，传递查询参数对象到服务器
 *  2.4 获取匹配数据，覆盖到页面展示
 */

const filterButtton = document.querySelector(".sel-form .btn");

filterButtton.addEventListener("click", () => {
  const form = document.querySelector(".sel-form");
  const { status, channel_id } = serialize(form, { hash: true, empty: true });
  showArticleList(new PageQueryObj(status, channel_id));
});
/**
 * 目标3：分页功能
 *  3.1 保存并设置文章总条数
 *  3.2 点击下一页，做临界值判断，并切换页码参数并请求最新数据
 *  3.3 点击上一页，做临界值判断，并切换页码参数并请求最新数据
 */
document.querySelector(".pagination .last").addEventListener("click", () => {
  //have previous page
  if (lastQueryObj.page > 1) {
    lastQueryObj.page--;
    showArticleList(lastQueryObj);
  }
});
document.querySelector(".pagination .next").addEventListener("click", () => {
  //have next page
  if (lastQueryObj.page * lastQueryObj.per_page < totalCount) {
    lastQueryObj.page++;
    showArticleList(lastQueryObj);
  }
});

/**
 * 目标4：删除功能
 *  4.1 关联文章 id 到删除图标
 *  4.2 点击删除时，获取文章 id
 *  4.3 调用删除接口，传递文章 id 到服务器
 *  4.4 重新获取文章列表，并覆盖展示
 *  4.5 删除最后一页的最后一条，需要自动向前翻页
 */

document.querySelector(".art-list").addEventListener("click", async (event) => {
  const id = event.target.parentNode.dataset.id;
  //edit
  if (event.target.classList.contains("edit")) {
    location.href = `../publish/index.html?id=${id}`;
  }
  //delete
  if (event.target.classList.contains("del")) {
    //delete the page
    try {
      await axios({
        url: `/v1_0/mp/articles/${id}`,
        method: "delete",
      });
    } catch (error) {
      console.log(error.response.data.message);
    }

    const childenLength = document.querySelector(".art-list").children.length;

    //the item to delete is the last item
    if (childenLength === 1) {
      if (lastQueryObj.page > 1) {
        lastQueryObj.page--;
      }
      //lastQueryObj.page=1,we do nothing here.
    }

    showArticleList(lastQueryObj);
  }
});
// 点击编辑时，获取文章 id，跳转到发布文章页面传递文章 id 过去
