export default function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name';
  const OTHER_URL = `?fields=name,capital,population,flags,languages`;
  return fetch(`${BASE_URL}/${name}${OTHER_URL}`)
          .then(response => {
              if (!response.ok) {
                  throw error(response.status);
              }
          return response.json();
      })
};
