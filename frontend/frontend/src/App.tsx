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

const citiesPerPage = 50;

const App = () => {
  const [countries, setCountries] = useState<CountryProps[] | null>([]);
  const [cities, setCities] = useState<CityProps[] | null>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const getInitialData = async () => {
      const newCountries = await fetchCountries();
      setCountries(newCountries);

      const newCities = await fetchCities(null, 0, citiesPerPage);
      setCities(newCities);
    };

    getInitialData();
  }, []);

  useEffect(() => {
    const getNewCities = async () => {
      if (selectedCountry === "") {
        const newCities = await fetchCities(null, 0, citiesPerPage);
        setCities(newCities);
      } else {
        const newCities = await fetchCities(selectedCountry, 0, citiesPerPage);

        setCities(newCities);
      }
    };

    getNewCities();
  }, [selectedCountry]);

  const handleOnAllCitiesClick = async () => {
    setCities([]);

    setSelectedCountry("");
  };

  const handleOnCountryClick = (country: string) => {
    setCities([]);

    setSelectedCountry(country);
  };

  const handleTableScroll = async (e: UIEvent<HTMLDivElement>) => {
    const isScrollAtBottom =
      e.currentTarget.scrollHeight - Math.ceil(e.currentTarget.scrollTop) <=
      e.currentTarget.clientHeight;

    if (!isScrollAtBottom) return;

    let newCities: [];

    if (selectedCountry === "") {
      newCities = await fetchCities(null, cities?.length, citiesPerPage);
    } else {
      newCities = await fetchCities(
        selectedCountry,
        cities?.length,
        citiesPerPage,
        searchText
      );
    }
    setCities((cities) => (cities ? [...cities, ...newCities] : cities));
  };

  const searchCity = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCities = await fetchCities(
      selectedCountry ?? null,
      0,
      citiesPerPage,
      e.target.value
    );

    setSearchText(e.target.value);
    setCities(newCities);
  };

  return (
    <div className="app">
      <h2>Cities App</h2>
      <input type="text" onChange={searchCity} />
      <div className="lists">
        <Sidebar>
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
        </Sidebar>
        <CitiesTable cities={cities} handleScroll={handleTableScroll} />
      </div>
    </div>
  );
};

export default App;
