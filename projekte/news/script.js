const API_KEY = "03a4cb2dcd7448899b25c9998301e0b3";
const newsContainer = document.getElementById("newsContainer");

let currentPage = 1;
let currentCategory = null;
let currentKeyword = null;
let isLoading = false;
let lastArticleCount = 0;

function getNews(isSearching) {
    if (isLoading) return;

    isLoading = true;
    let url;
    if (isSearching) {
        url = `https://newsapi.org/v2/everything?q=${currentKeyword}&apiKey=${API_KEY}&page=${currentPage}`;
    } else {
        const category = currentCategory || document.getElementById("category").value;
        url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}&page=${currentPage}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const articlesWithImage = data.articles.filter(article => article.urlToImage);

            if (articlesWithImage.length === 0 || articlesWithImage.length === lastArticleCount) {
                displayNoMoreNews();
                isLoading = false;
                return;
            }

            lastArticleCount = articlesWithImage.length;

            if (currentPage === 1) {
                newsContainer.innerHTML = '';
            }

            articlesWithImage.forEach(article => {
                const newsItem = createNewsItem(article);
                newsContainer.innerHTML += newsItem;
            });

            currentPage++;
            isLoading = false;
        })
        .catch(error => {
            console.error("Error fetching news:", error);
            isLoading = false;
        });
}

function createNewsItem(article) {
    return `
    <div class="newsItem">
      <div class="newsImage">
        <img src="${article.urlToImage}" alt="${article.title}">
      </div>
      <div class="newsContent">
        <div class="info">
          <h5>${article.source.name}</h5>
          <span>|</span>
          <h5>${new Date(article.publishedAt).toLocaleDateString('de-DE')}</h5>
        </div>
        <h2>${article.title}</h2>
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      </div>
    </div>
  `;
}

function displayNoMoreNews() {
    newsContainer.innerHTML += "<p>Keine neuen Nachrichten!</p>";
}

window.onscroll = function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        if (currentKeyword) {
            getNews(true);
        } else {
            getNews(false);
        }
    }
}

document.getElementById("searchKeyword").addEventListener("input", function () {
    currentPage = 1;
    currentCategory = null;
    currentKeyword = this.value;
});

document.getElementById("fetchCategory").addEventListener("click", function () {
    currentPage = 1;
    currentKeyword = null;
    currentCategory = document.getElementById("category").value;
    getNews(false);
});
