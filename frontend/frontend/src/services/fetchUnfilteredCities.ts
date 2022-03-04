const fetchUnfilteredCities = (
  lastCityIndex: number = 0,
  citiesPerPage: number
) => {
  const data = fetch(
    `http://localhost:3001/api/cities?from=${lastCityIndex}&limit=${citiesPerPage}`
  )
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
  return data;
};

export default fetchUnfilteredCities;
