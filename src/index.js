import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
// import * as _ from "lodash"
import fetchCountries from './fetchCountries';
// import notFoundCantry from './fetchCountries'

const DEBOUNCE_DELAY = 300;
// https://app.getpostman.com/join-team?invite_code=e3de4fbd1b2ef7d3b8baa108cc6be7be

const input = document.querySelector('#search-box');
const countrylist = document.querySelector('.country-list');
const countryinfo = document.querySelector('.country-info');
document.getElementById('search-box').focus()
    // const fetchCountries = new NewFetchCountries();



// input.addEventListener('input', onSearch);
input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
// console.dir(input.value)

function menyCantry() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

function onSearch(evt) {
    evt.preventDefault()
    const cantryName = evt.target.value.trim()
        // console.log(cantryName)
    fetchCountries(cantryName).then(data => {
        if (data.length > 1 & data.length < 10) {
            fetchCountries(cantryName).then(data => creatMarkupListCantry(data));
        }
    })
    fetchCountries(cantryName).then(data => {
        if (data.length = 1) {
            // fetchCountries(cantryName).then(data => console.log(data));
            fetchCountries(cantryName).then(data => creatMarkupCantry(data));
            // console.log(data)
        }
    })
    fetchCountries(cantryName).then(data => {
            if (data.length > 10) {
                menyCantry();
            }
        })
        // fetchCountries(cantryName).then(data => {
        //     if (data.length > 1 & data.length < 10) {
        //         fetchCountries(cantryName).then(data => creatMarkupListCantry(data))

    //     } else if (data.length = 1) {
    //         fetchCountries(cantryName).then(data => creatMarkupCantry(data))

    //     }
    //     if (data.length > 10) {
    //         menyCantry()

    //     }
    // })



}






// export default function notFoundCantry() {
//     Notiflix.Notify.failure('Oops, there is no country with that name');
//     setTimeout(() => {
//         location.reload()
//     }, 2000);
// }

// function fetchCountries(cantryName) {
//     // console.log(fetch(`https://restcountries.com/v3.1/name/${cantryName}?name=name.official&capital=capital&populatio=population&flags=flags.svg&languages=languages`))
//     // console.log(fetch(`https://restcountries.com/v3.1/all?name=name.official&capital=capital&populatio=population&flags=flags.svg&languages=languages`))
//     return fetch(`${BASE_URL}${cantryName}?name=name.official&capital=capital&populatio=population&flags=flags.svg&languages=languages`).then(response => {
//             // console.log(response)
//             if (!response.ok) {
//                 notFoundCantry();
//                 throw new Error(response.status);
//             }
//             return response.json();
//         })
//         .catch(err => console.error(err));
// }



function creatMarkupCantry(arr) {
    const markup = arr.map(({ name, flags, capital, population, languages }) => `
            <img src="${flags.svg}" alt="${name.official}" width = "100">
            <h1>${name.official}</h1>
            <h2>Capital: ${capital}</h2>
            <h3>Population: ${population} piople</h3>
            <h3>Languages: ${Object.values(languages)}</h3>`).join('');
    countryinfo.innerHTML = markup;

}

function creatMarkupListCantry(arr) {
    const markupList = arr.map(({ name, flags }) => `<div> <img src="${flags.svg}" alt="${name.official}" width = "50">
            <h1>${name.official}</h1>
    </div>`).join('');
    countrylist.innerHTML = markupList;

}