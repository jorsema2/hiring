export const fetchCountryCities = (
  country: string,
  citiesDisplayedNumber: number = 0,
  citiesPerPage: number
) => {
  // console.log(country, citiesDisplayedNumber, citiesPerPage);
  const data = fetch(
    `http://localhost:3001/api/cities?country=${country}&from=${citiesDisplayedNumber}&limit=${citiesPerPage}`
  )
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
  return data;
};

export default fetchCountryCities;
