const fetchCountryCities = (
  country: string,
  lastCityIndex: number = 0,
  citiesPerPage: number
) => {
  const data = fetch(
    `http://localhost:3001/api/cities?country=${country}&from=${lastCityIndex}&limit=${citiesPerPage}`
  )
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
  return data;
};

export default fetchCountryCities;
