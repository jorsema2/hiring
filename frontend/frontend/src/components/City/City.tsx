import CityProps from "../../types/types";

const City = ({ name, country, subCountry, geoNameId }: CityProps) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{country}</td>
      <td>{subCountry}</td>
      <td>
        <a
          href={`https://www.geonames.org/${geoNameId}`}
          target="_blank"
          rel="noreferrer"
        >
          {geoNameId}
        </a>
      </td>
    </tr>
  );
};

export default City;
