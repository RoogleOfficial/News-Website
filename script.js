const API_KEY ="ddc0a944808441dfb3ea1252abb2148d0";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",() =>fetchNews("India"));


async function fetchNews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
    
}

function bindData(articles){
    const cardContainer = document.querySelector("#cards-container");
    const cardTemplate = document.querySelector("#template-card-details");

    cardContainer.innerHTML="";

    articles.forEach( article => {

        if(!article.urlToImage) return;

        const cloneCard = cardTemplate.content.cloneNode(true);
        // console.log(article);

        fillDataToCard(cloneCard,article);

        cardContainer.appendChild(cloneCard);

    });
    
}

function fillDataToCard(cloneCard,article){
    const newsImg = cloneCard.querySelector('#news-img');
    const newsTitle = cloneCard.querySelector('#news-title')
    const newsPub = cloneCard.querySelector('#news-source');
    const newsDesc = cloneCard.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsPub.innerHTML=`${article.source.name} ${date}`;
    cloneCard.firstElementChild.addEventListener("click",() =>{
        window.open(article.url,"_blank");
    })
}

let cur_selected = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    cur_selected?.classList.remove("active");
    cur_selected = navItem;
    cur_selected.classList.add("active");
}



