export const fetchUnfilteredCities = () => {
  const data = fetch("http://localhost:3001/api/cities")
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
  return data;
};

export default fetchUnfilteredCities;
