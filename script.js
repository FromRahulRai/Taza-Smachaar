const API_Key = "a035bfa943124713893acb2c67db8193";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", fetchNews("India"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_Key}`);
  const data = await res.json();
  //   console.log(data)
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newssource = cardClone.querySelector("#news-source");
  const newsDiscription = cardClone.querySelector("#news-dsc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDiscription.innerHTML = article.description;
  const date = new Date(article.publishedAt).toLocaleString("en-Us", {
    timeZone: "Asia/Jakarta",
  });

  newssource.innerHTML = `${article.source.name} • ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchBtn = document.getElementById("search-btn");
const searchText = document.getElementById("search-text");
searchBtn.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
