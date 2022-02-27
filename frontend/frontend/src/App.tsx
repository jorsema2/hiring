import "./App.css";
import { Table } from "./components/Table";
import { Sidebar } from "./components/Sidebar";
import { Country } from "./components/Country/Country";
import fetchCountries from "./services/fetchCountries";
import fetchCountryCities from "./services/fetchCountryCities";
import { useState, useEffect } from "react";
import fetchAllCities from "./services/fetchAllCities";

type CountryProps = {
  name: string;
  count: number;
};

type CityProps = {
  name: string;
  country?: string;
  subCountry?: string;
  geoNameId?: number;
};

const App = () => {
  const [countries, setCountries] = useState<CountryProps[] | null>([]);
  const [cities, setCities] = useState<CityProps[] | null>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  useEffect(() => {
    const asyncFetch = async () => {
      const newCountries = await fetchCountries();
      setCountries(newCountries);

      const newCities = await fetchAllCities();
      setCities(newCities);
    };

    asyncFetch();
  }, []);

  useEffect(() => {
    const asyncFetch = async () => {
      const newCities = await fetchCountryCities(selectedCountry);

      setCities(newCities);
    };

    asyncFetch();
  }, [selectedCountry]);

  const handleClick = (country: string) => {
    setSelectedCountry(country);
  };

  return (
    <div className="App">
      <Sidebar>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {countries?.map((country) => (
            <Country
              key={country.name}
              name={country.name}
              citiesNumber={country.count}
              onClick={() => handleClick(country.name)}
              isSelected={country.name === selectedCountry}
            />
          ))}
        </div>
      </Sidebar>
      <Table cities={cities} />
    </div>
  );
};

export default App;
