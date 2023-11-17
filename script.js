const API_KEY = "634b80de6ead48908c26b6843627ecc6";
const url = "https://newsapi.org/v2/everything?q=";
const cardContainer = document.getElementById('card-container')
const cardTamplate = document.getElementById("card-template");
const navigationButtonDiv = document.getElementById('navigationButton-div');
const cricket = document.getElementById("cricket")
const finance = document.getElementById("finance")
const football = document.getElementById("football");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const logoAnchor = document.getElementById('logo-anchor')

logoAnchor.addEventListener('click', () => {
  location.reload();
})

window.addEventListener('load', () => {
  fetchData("USA")
})

function fetchData(query) {
  try {
    fetch(`${url}${query}&apiKey=${API_KEY}`).then((res) => {
      return res.json()
    }).then((res) => {
      bindData(res.articles)
    })
  } catch (error) {
    console.log(error)
  }
}

function bindData(articles) {
  let seeAllOrNot = false;
  const falseValue = "See More";
  const trueValue = "See Less";
  cardContainer.innerHTML = "";

  if (articles) {
    articles.forEach((elements) => {
      if (!elements.urlToImage) {
        return;
      }
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card')
      const cardImg = document.createElement('img');
      const cardInformationSection = document.createElement('div')
      cardInformationSection.classList.add('information-section')
      const cardTitle = document.createElement('h3');
      const cardDate = document.createElement('h6');
      cardDate.style.color = "#4f5451"
      const visitAnchor = document.createElement('a')
      visitAnchor.innerHTML = "Visit News";
      visitAnchor.href = elements.url;
      visitAnchor.classList.add("visit-anchor")
      visitAnchor.target = "_blank";
      const cardDesc = document.createElement('p');
      const seeMoreBtn = document.createElement('button');
      seeMoreBtn.classList.add("seeMore-button")
      seeMoreBtn.innerHTML = "See More"
      const lineBreak = document.createElement('div')
      lineBreak.classList.add('line-break')
      seeMoreBtn.addEventListener('click', () => {
        if (seeAllOrNot === true) {
          seeAllOrNot = false;
        } else {
          seeAllOrNot = true;
        }
        seeMoreBtn.innerHTML = seeAllOrNot ? trueValue : falseValue;
        cardDesc.innerHTML = !seeAllOrNot ? elements.description.slice(0, 100) : elements.description;
      })

      cardDesc.innerHTML = elements.description.slice(0, 100)
      cardDate.innerHTML = elements.author + "   |   " + new Date(elements.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
      });
      cardImg.src = elements.urlToImage;
      cardTitle.innerHTML = elements.title.slice(0, 30)

      cardDiv.appendChild(cardImg)
      cardDiv.appendChild(cardInformationSection)
      cardInformationSection.appendChild(cardTitle);
      cardInformationSection.appendChild(cardDate);
      cardInformationSection.appendChild(lineBreak);
      cardInformationSection.appendChild(visitAnchor)
      cardInformationSection.appendChild(lineBreak);
      cardInformationSection.appendChild(cardDesc)
      cardInformationSection.appendChild(seeMoreBtn);
      cardContainer.appendChild(cardDiv);
    })
  }
}

function cricketNavClick() {
  fetchData(cricket.innerHTML);
  if (cricket) {
    cricket.classList.add('active')

    if (finance.classList) {
      finance.classList.remove('active')
    }
    if (football.classList) {
      football.classList.remove('active')
    }
  }
}
function financeNavClick() {
  fetchData(finance.innerHTML)
  if (finance) {
    finance.classList.add('active');

    if (cricket.classList) {
      cricket.classList.remove('active')
    }

    if (football.classList) {
      football.classList.remove('active')
    }
  }
}
function footballNavClick() {
  fetchData(football.innerHTML);
  if (football) {
    football.classList.add('active');

    if (finance.classList) {
      finance.classList.remove('active')
    }

    if (cricket.classList) {
      cricket.classList.remove('active')
    }
  }
}

cricket.addEventListener('click', () => {
  cricketNavClick();
})

finance.addEventListener('click', () => {
  financeNavClick();
})

football.addEventListener('click', () => {
  footballNavClick();
})

function inputSearch() {
  fetchData(searchInput.value)
  if (searchInput.value) {
    football.classList.remove('active');
    cricket.classList.remove('active');
    finance.classList.remove('active')
  }
}

searchBtn.addEventListener('click', () => {
  inputSearch();
})