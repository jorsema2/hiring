import "./App.css";
import { Table } from "./components/Table";
import { Sidebar } from "./components/Sidebar";
import { Country } from "./components/Country/Country";
import fetchCountries from "./services/fetchCountries";
import fetchCountryCities from "./services/fetchCountryCities";
import { useState, useEffect, UIEvent } from "react";
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

const newCitiesPerFetch: number = 25;

const App = () => {
  const [countries, setCountries] = useState<CountryProps[] | null>([]);
  const [cities, setCities] = useState<CityProps[] | null>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [citiesShownNumber, setCitiesShownNumber] = useState<number>(25);

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
    if (selectedCountry === "") return;

    const asyncFetch = async () => {
      const newCities = await fetchCountryCities(selectedCountry);

      setCities(newCities);
    };

    asyncFetch();
  }, [selectedCountry]);

  const handleOnAllCitiesClick = async () => {
    const newCities = await fetchAllCities();
    setCities(newCities);
    setSelectedCountry("");
  };

  const handleOnCountryClick = (country: string) => {
    setSelectedCountry(country);
  };

  const handleTableScroll = (e: UIEvent<HTMLDivElement>) => {
    const isScrollAtBottom =
      e.currentTarget.scrollHeight - Math.ceil(e.currentTarget.scrollTop) ===
      e.currentTarget.clientHeight;
    if (isScrollAtBottom) {
      console.log("I arrived");
    }
  };

  return (
    <div className="App">
      <Sidebar>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={handleOnAllCitiesClick}>All cities</button>
          {countries?.map((country) => (
            <Country
              key={country.name}
              name={country.name}
              citiesNumber={country.count}
              onClick={() => handleOnCountryClick(country.name)}
              isSelected={country.name === selectedCountry}
            />
          ))}
        </div>
      </Sidebar>
      <Table cities={cities} handleScroll={handleTableScroll} />
    </div>
  );
};

export default App;
