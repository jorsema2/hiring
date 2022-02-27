import "./Table.css";
import { useEffect, useState } from "react";
import { City } from "./City/City";

type CityProps = {
  name: string;
  country?: string;
  subcountry?: string;
  geonameid?: number;
};

export const Table = () => {
  const [cities, setCities] = useState<CityProps[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/cities")
      .then((response) => response.json())
      .then(setCities);
  }, []);

  return (
    <div id="cities-table-wrapper">
      <table>
        <thead>
          <tr>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>Country</td>
            <td>Sub-country</td>
            <td>Geoname page</td>
          </tr>
          {cities?.map((city, index) => (
            <City
              key={index}
              name={city.name}
              country={city.country}
              subCountry={city.subcountry}
              geoNameId={city.geonameid}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
