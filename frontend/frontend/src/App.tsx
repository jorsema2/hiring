import "./App.css";
import CitiesTable from "./components/CitiesTable/CitiesTable";
import Sidebar from "./components/Sidebar/Sidebar";
import Country from "./components/Country/Country";
import fetchCountries from "./services/fetchCountries";
import fetchCities from "./services/fetchCities";
import React, { useState, useEffect, UIEvent } from "react";
import CityProps from "./types/types";

type CountryProps = {
  name: string;
  count: number;
};

const FIRST_CITY_INDEX = 0;
const CITIES_PER_PAGE = 50;

const App = () => {
  const [countries, setCountries] = useState<CountryProps[] | null>([]);
  const [cities, setCities] = useState<CityProps[] | null>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const getInitialData = async () => {
      const newCountries = await fetchCountries();
      setCountries(newCountries);

      getInitialCities("");
    };

    getInitialData();
  }, []);

  useEffect(() => {
    getInitialCities(selectedCountry);
  }, [selectedCountry]);

  const getInitialCities = async (country?: string) => {
    const newCities = await fetchCities(
      country ?? null,
      FIRST_CITY_INDEX,
      CITIES_PER_PAGE
    );
    setCities(newCities);
  };

  const handleButtonClick = (country?: string) => {
    setCities([]);
    setSelectedCountry(country ?? "");
  };

  const handleTableScroll = async (e: UIEvent<HTMLDivElement>) => {
    const isScrollAtBottom =
      e.currentTarget.scrollHeight - Math.ceil(e.currentTarget.scrollTop) <=
      e.currentTarget.clientHeight;

    if (!isScrollAtBottom) return;

    const newCities = await fetchCities(
      selectedCountry ?? null,
      cities?.length,
      CITIES_PER_PAGE,
      searchText ?? undefined
    );

    setCities((cities) => (cities ? [...cities, ...newCities] : cities));
  };

  const searchCity = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCities = await fetchCities(
      selectedCountry ?? null,
      FIRST_CITY_INDEX,
      CITIES_PER_PAGE,
      e.target.value
    );

    setSearchText(e.target.value);
    setCities(newCities);
  };

  return (
    <div className="app">
      <h2>Cities App</h2>
      <div className="searcher">
        <p>Search a city:</p>
        <input type="text" onChange={searchCity} />
      </div>
      <div className="lists">
        <Sidebar>
          <button onClick={() => handleButtonClick(undefined)}>
            All cities
          </button>
          {countries?.map((country) => (
            <Country
              key={country.name}
              name={country.name}
              citiesNumber={country.count}
              onClick={() => handleButtonClick(country.name)}
              isSelected={country.name === selectedCountry}
            />
          ))}
        </Sidebar>
        <CitiesTable cities={cities} handleScroll={handleTableScroll} />
      </div>
    </div>
  );
};

export default App;
