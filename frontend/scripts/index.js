const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
const dateTimeCont = document.querySelector("[data-jumbotron-dateTime]");
const weatherCont = document.querySelector("[data-jumbotron-weather]");
const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar');
const searchBtn = document.querySelector('.content nav form .form-input button');
const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
const searchForm = document.querySelector('.content nav form');
const toggler = document.getElementById('theme-toggle');

//Function to save itemto localStorage
function saveToStore (key, content) {
    localStorage.setItem(key, content);
}
//Function to set Jumbotron info
function setJumbotronStuff(locWeatherQuoteJson) {
    saveToStore("locWeatherQuote_Info", JSON.stringify(locWeatherQuoteJson));
    console.log(locWeatherQuoteJson);
    weatherCont.querySelector("[data-jumbotron-location]").textContent = `${locWeatherQuoteJson.city}, ${locWeatherQuoteJson.country_code}`;
    weatherCont.querySelector("[data-jumbotron-weather]").textContent = `${locWeatherQuoteJson.mainWeatherInfo.temp}`;
    weatherCont.querySelector("[data-jumbotron-feels]").textContent = `${locWeatherQuoteJson.mainWeatherInfo.feels_like}`;
    document.querySelector("[data-jumbotron-quote]").textContent = `${locWeatherQuoteJson.quoteData[0].q}`;
    document.querySelector("[data-jumbotron-author]").textContent = `- ${locWeatherQuoteJson.quoteData[0].a}`;
}
//Send fetch request on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    let weatherStuff;
    fetch("/home").then(res => res.json()).then(data => {
        setJumbotronStuff(data);
    });
});

//Set date and time for current device
dateTimeCont.querySelector("[data-jumbotron-date]").textContent = new Date().toDateString();
function setTime () {
    dateTimeCont.querySelector("[data-jumbotron-time]").textContent = new Date().toLocaleTimeString();
}
setInterval(setTime, 1000);
//Add active class to sidebar links
sideLinks.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', () => {
        sideLinks.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});
//Minify sidebar when menu icon is clicked
menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
    document.querySelector(".profile-bg-img").classList.toggle("mkSmall");
});
//Add EventListener to search button
searchBtn.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault;
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchBtnIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchBtnIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});
//Change element classes on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    } else {
        sideBar.classList.remove('close');
    }
    if (window.innerWidth > 576) {
        searchBtnIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});
//Event Listener for theme toggle click
toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});