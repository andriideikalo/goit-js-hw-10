import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
// import * as _ from "lodash"
// import _ from 'lodash'
import fetchCountries from './fetchCountries';
// import notFoundCantry from './fetchCountries'
// console.log(debounce)
// console.log(Notiflix)
const DEBOUNCE_DELAY = 300;
// https://app.getpostman.com/join-team?invite_code=e3de4fbd1b2ef7d3b8baa108cc6be7be

const input = document.querySelector('#search-box');
const body = document.querySelector('.body');
const countrylist = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
// const countryCart = document.querySelector('.country-cart');
// const countryItem = document.querySelector('.list-item');

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
    console.dir(cantryName)
    console.dir(evt)
        // fetchCountries(cantryName).then(data => {
        //     if (data.length > 1 & data.length < 10) {
        //         fetchCountries(cantryName).then(data => creatMarkupListCantry(data));
        //     }
        // })
        // fetchCountries(cantryName).then(data => {
        //     if (data.length = 1) {
        //         // fetchCountries(cantryName).then(data => console.log(data));
        //         fetchCountries(cantryName).then(data => creatMarkupCantry(data));
        //         // console.log(data)
        //     }
        // })
        // fetchCountries(cantryName).then(data => {
        //     if (data.length > 10) {
        //         menyCantry();
        //     }
        // })

    if (!cantryName) {
        //     countrylist.remove()
        //     countryinfo.remove()
        location.reload()
        Notiflix.Notify.failure('Oops, there is no country with that name');
        return
    }
    fetchCountries(cantryName).then(data => {
        // console.log(data.length)

        // if (!data.length) {
        //     Notiflix.Notify.failure('Oops, there is no country with that name');
        //     // countryCart.remove()
        //     // countryItem.remove()
        //     countrylist.remove()
        //     countryinfo.remove()
        //     return
        // }


        if (data.length > 10) {

            menyCantry()
        } else if (data.length >= 2 & data.length <= 10) {
            creatMarkupListCantry(data)
            countryinfo.remove()
        } else if (data.length = 1) {
            creatMarkupCantry(data)
            countrylist.remove()
        }


    })

}


function creatMarkupCantry(arr) {
    const markup = arr.map(({ name, flags, capital, population, languages }) => `
           <div class="country-info">  <img src="${flags.svg}" alt="${name.official}" width = "100">
            <h1>${name.official}</h1>
            <h2>Capital: ${capital}</h2>
            <h3>Population: ${population} piople</h3>
            <h3>Languages: ${Object.values(languages)}</h3></div>`).join('');
    countryInfo.innerHTML = markup;

}

function creatMarkupListCantry(arr) {
    const markupList = arr.map(({ name, flags }) => `<li class="country-item" styles{ list-style: none;}> <img src="${flags.svg}" alt="${name.official}" width = "50">
            <h1>${name.official}</h1></li>`).join('');
    countrylist.innerHTML = markupList;

}