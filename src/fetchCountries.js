import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1/name/';
const countrylist = document.querySelector('.country-list');
const countryinfo = document.querySelector('.country-info');

export default function fetchCountries(cantryName) {
    // console.log(fetch(`https://restcountries.com/v3.1/name/${cantryName}?name=name.official&capital=capital&populatio=population&flags=flags.svg&languages=languages`))
    // console.log(fetch(`https://restcountries.com/v3.1/all?name=name.official&capital=capital&populatio=population&flags=flags.svg&languages=languages`))
    return fetch(`${BASE_URL}${cantryName}?name=name.official&capital=capital&populatio=population&flags=flags.svg&languages=languages`).then(response => {
            // console.log(response)
            if (!response.ok) {
                notFoundCantry();
                throw new Error(response.status);
            }
            return response.json();
        })
        .catch(err => console.error(err));
}

function notFoundCantry() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    countrylist.remove()
    countryinfo.remove()

    //     setTimeout(() => {
    // location.reload()
    //     }, 100);
}