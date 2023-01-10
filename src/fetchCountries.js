export const fetchCountries = (name) => fetch(`https://restcountries.com/v3.1/name/${name.trim()}
?fields=name,capital,population,flags,languages`)

