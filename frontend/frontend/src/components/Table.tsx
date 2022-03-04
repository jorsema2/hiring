import "./Table.css";
import { City } from "./City/City";
import { UIEvent } from "react";

type CityProps = {
  name: string;
  country?: string;
  subcountry?: string;
  geonameid?: number;
};

type CitiesProps = {
  cities: CityProps[] | null;
  handleScroll: (event: UIEvent<HTMLDivElement>) => void;
};

export const Table = ({ cities, handleScroll }: CitiesProps) => {
  return (
    <div className="container">
      <h3>Cities</h3>
      <div className="cities-list" onScroll={handleScroll}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Sub-country</th>
              <th>Geoname page</th>
            </tr>
          </thead>
          <tbody>
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
    </div>
  );
};
