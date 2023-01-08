import './css/styles.css';
import { fetchCountries } from './fetchCountries'

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;



const refs = {
    input: document.querySelector("#search-box"),
}
const { input } = refs

input.addEventListener('input', debounce(onInput, 300))
    // debounce(() =>
    //     fetchCountries(input.value)
    //     .then(res => res.json())
    //     .then(data => console.log(data))
    //         .catch(err => console.log(err)), 1000))



function onInput() {
    if (input.value === "") {
        return
    }
    fetchCountries(input.value)
    .then(res => res.json())
    .then(data => console.log(data))
        .catch(err => console.log(err))
}
