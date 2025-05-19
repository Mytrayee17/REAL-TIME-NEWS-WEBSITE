const APIKEY="e0f342673c94455c9f48d52f021f346f";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=> fetechNews("India"));

async function fetechNews(query){
    const res= await fetch(`${url}${query}&apiKey=${APIKEY}`);
    const data=await res.json();
    bindData(data.articles);
}
function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplate= document.getElementById('template-news');

    cardsContainer.innerHTML='';
    articles.forEach((article)=> {
        if(! article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector("#news-image");
    const newsTitle=cardClone.querySelector("#news-title");
    const newsSource=cardClone.querySelector("#news-source");
    const newsDesc=cardClone.querySelector("#news-desc");
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
   const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML=`${article.source.name} · ${date}`;
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,'_blank');
    });
}
let curSelectedNav = null;
function onNavItemClick(id) {
    fetechNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-bar");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetechNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});