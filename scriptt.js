const API_KEY = "ddc0a944808441dfb3ea1252abb2148d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>{
    fetchNews("India");
})

function reload(){
    window.location.reload(); 
}



async function fetchNews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);

    const data = await res.json();
    bindData(data.articles);

}

function bindData(articles){
    const cardContainer = document.querySelector("#cards-container") ;
    const templateCard = document.querySelector("#template-card-details");

    cardContainer.innerHTML="";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cloneCard = templateCard.content.cloneNode(true);
        fillDataToCard(article,cloneCard);
        cardContainer.appendChild(cloneCard);

    });
}


    function fillDataToCard(article, cloneCard){
        const newsImg = cloneCard.querySelector("#news-img");
        const newsTitle = cloneCard.querySelector("#news-title");
        const newsSource = cloneCard.querySelector("#news-source");
        const newsDesc = cloneCard.querySelector("#news-desc");
        newsImg.src = article.urlToImage;
        newsTitle.innerHTML=article.title;
        newsDesc.innerHTML=article.description;

        const date = new Date(article.publishedAt).toLocaleString("en-US",{
            timeZone:"Asia/Jakarta"
        });

        newsSource.innerHTML=`${article.source.name} . ${date}`;

        cloneCard.firstElementChild.addEventListener("click",() => {
            window.open(article.url,"_blank");
        });

    }

    let curSelected = null

    function onNavItemClick(id){
        fetchNews(id);
        const navItem = document.getElementById(id);
        curSelected?.classList.remove("active");
        curSelected = navItem;
        curSelected.classList.add("active");
    }
  
        const searchText = document.getElementById("search-text");
        const searchBtn = document.getElementById("search-btn");

        searchBtn.addEventListener("click",() => {
            const value = searchText.value;
            fetchNews(value);
            curSelected = null;
        });

  

    


    



