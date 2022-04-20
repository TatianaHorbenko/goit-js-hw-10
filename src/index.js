import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY));

function countrySearch(element) {
    element.preventDefault();

    const inputText = searchBox.value.trim()
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';

    if (inputText) {
        fetchCountries(inputText)
            .then(countryCard)
            .catch(error => {
                return Notiflix.Notify.failure('Oops, there is no country with that name');
            })
    }
    function countryCard(data) {
        if (data.length > 10) {
            return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }
        countriesMarkup(data)
    }

}

function countriesMarkup(data) {
const markupData = data.map(({ name: { official }, flags: { svg } }) => {
    return `
        <li><img src="${svg}" alt="${official}" width="50" height="30"/> ${official}</li>`;
    })
.join('')

    if (data.length === 1) {
        const languages = Object.values(data[0].languages).join(', ');

        const markupInfo = `<ul>
        <li>Capital: <p>${data[0].capital}</p></li>
        <li>Population: <p>${data[0].population}</p></li>
        <li>Languages: <p>${languages}</p></li>
        </ul>`;

        countryInfo.insertAdjacentHTML("beforeend", markupInfo);
    }
    return countryList.insertAdjacentHTML("beforeend", markupData);
}