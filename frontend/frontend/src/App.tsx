import "./App.css";
import { Table } from "./components/Table";
import { Sidebar } from "./components/Sidebar";
import { Country } from "./components/Country/Country";
import { fetchCountries } from "./services/fetchCountries";
import { useState, useEffect } from "react";

type CountryProps = {
  name: string;
  count: number;
};

const App = () => {
  const [countries, setCountries] = useState<CountryProps[] | null>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  useEffect(() => {
    const asyncFetch = async () => {
      const newCountries = await fetchCountries();
      setCountries(newCountries);
    };

    asyncFetch();
  }, []);

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
      <Table />
    </div>
  );
};

export default App;
