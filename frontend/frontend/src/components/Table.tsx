import "./Table.css";
import { useEffect, useState } from "react";

type City = {
  name: string;
  country?: string;
  subcountry?: string;
  geonameid?: number;
};

export const Table = () => {
  const [cities, setCities] = useState<City[] | null>(null);

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
            <td>Subcountry</td>
            <td>Geonameid</td>
          </tr>
          {cities?.map((city, index) => (
            <tr key={index}>
              <td>{city.name}</td>
              <td>{city.country}</td>
              <td>{city.subcountry}</td>
              <td>{city.geonameid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
