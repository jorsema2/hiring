export const fetchCountryCities = (country: string) => {
  const data = fetch(`http://localhost:3001/api/cities?country=${country}`)
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
  return data;
};

export default fetchCountryCities;
