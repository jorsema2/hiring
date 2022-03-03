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

const handleScroll = (e: any) => {
  const isScrollAtBottom =
    e.target.scrollHeight - Math.ceil(e.target.scrollTop) ===
    e.target.clientHeight;
  if (isScrollAtBottom) {
    console.log("I arrived");
  }
};

export const Table = ({ cities }: CitiesProps) => {
  return (
    <div className="cities-list" onScroll={handleScroll}>
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
