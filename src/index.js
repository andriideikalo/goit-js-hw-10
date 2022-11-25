import './css/styles.css';
import Notiflix from 'notiflix';

Notiflix.Notify.success('Sol lucet omnibus');

Notiflix.Notify.failure('Qui timide rogat docet negare');

Notiflix.Notify.warning('Memento te hominem esse');

Notiflix.Notify.info('Cogito ergo sum');

// https://app.getpostman.com/join-team?invite_code=e3de4fbd1b2ef7d3b8baa108cc6be7be

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');

const BASE_URL = 'https://restcountries.com/v3.1/all';

input.addEventListener('submit', onSearch);
// console.dir(input)

function onSearch(evt) {
    evt.preventDefault()
    console.dir(evt.currentTarget)

    // const {
    //     query: {
    //         value: searchValue
    //     },
    //     days: {
    //         value: daysValue
    //     }
    // } = evt.currentTarget.elements;

    // if (!searchValue) {
    //     alert('Поле пусте 😢');
    //     return;
    // }

    // forecastApi(searchValue, daysValue).then(data => creatMarkup(data.forecast.forecastday));
}



function creatMarkup(arr) {
    const markup = arr.map(item => `<li>
    <img src="${item.day.condition.icon}" alt="">
    <span>${item.day.condition.text}</span>
    <h2>День: ${item.date}</h2>
    <h3>Температура: ${item.day.avgtemp_c}&#8451;</h3>
</li>`).join('');
    list.innerHTML = markup;
}





function forecastApi(name = "Ukraine", value = 7) {
    return fetch(`${BASE_URL}?fields=${name.official},${capital},${languagesq}`).then(resp => {
            console.log(resp);
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json()
        })
        .catch(err => console.error(err));
}


const DEBOUNCE_DELAY = 300;