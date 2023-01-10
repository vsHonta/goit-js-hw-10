import './css/styles.css';
import { fetchCountries } from './fetchCountries'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;


const refs = {
    input: document.querySelector("#search-box"),
    wrapper: document.querySelector(".country-list"),
    div: document.querySelector(".country-info"),
}
const { input, wrapper, div } = refs

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))
    // debounce(() =>
    //     fetchCountries(input.value)
    //     .then(res => res.json())
    //     .then(data => console.log(data))
    //         .catch(err => console.log(err)), 1000))



function onInput(evt) {
    const {value} = evt.target

    if (value === "") {
        return
    }

    fetchCountries(value)
    .then(res => res.json())
    .then(dataArr => {
        console.log(dataArr)
        createMarkUp(dataArr)
    })
    .catch(err => console.log(err))
}



function createMarkUp(dataArr) {
    if (dataArr.length > 10) {
        wrapper.innerHTML = "";
        div.innerHTML = "";
        return Notify.info("Too many matches found. Please enter a more specific name.")
    } else if (dataArr.length > 1) {
        div.innerHTML = "";
        dataArr.map(unit => wrapper.insertAdjacentHTML('afterbegin',
            `<li class="item">
                <img src=${unit.flags.svg} alt="flag" width="100" height="70 "> 
                ${unit.name.common}
            </li>`))
    } else {
        wrapper.innerHTML = ""
        const langs = Object.values(dataArr[0].languages)
        div.innerHTML = 
            `<ul class="list">
                <li class="item"><img src="${dataArr[0].flags.svg}" alt="flag" width="100"/>${dataArr[0].name.common}</li>
                <li class="item">${dataArr[0].capital}</li>
                <li class="item">${dataArr[0].population}</li>
                <li class="item">${langs.join(', ')}</li>
            </ul>`
    }
}