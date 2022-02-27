export const fetchCountries = () => {
  const data = fetch("http://localhost:3001/api/countries")
    .then((response) => response.json())
    .then((response) => {
      return response;
    });

  return data;
};

export default fetchCountries;
