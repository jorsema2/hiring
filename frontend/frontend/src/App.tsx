import "./App.css";
import { Table } from "./components/Table";
import { Sidebar } from "./components/Sidebar";
import { Country } from "./components/Country/Country";
import fetchCountries from "./services/fetchCountries";
import fetchCountryCities from "./services/fetchCountryCities";
import { useState, useEffect, UIEvent } from "react";
import fetchUnfilteredCities from "./services/fetchUnfilteredCities";

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

const citiesPerPage = 50;

const App = () => {
  const [countries, setCountries] = useState<CountryProps[] | null>([]);
  const [cities, setCities] = useState<CityProps[] | null>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  useEffect(() => {
    const asyncFetch = async () => {
      const newCountries = await fetchCountries();
      setCountries(newCountries);

      const newCities = await fetchUnfilteredCities(0, citiesPerPage);
      setCities(newCities);
    };

    asyncFetch();
  }, []);

  useEffect(() => {
    if (selectedCountry === "") return;

    const fetchCountryFirstCities = async () => {
      const newCities = await fetchCountryCities(
        selectedCountry,
        0,
        citiesPerPage
      );

      setCities(newCities);
    };

    fetchCountryFirstCities();
  }, [selectedCountry]);

  const handleOnAllCitiesClick = async () => {
    setCities([]);

    const newCities = await fetchUnfilteredCities(0, citiesPerPage);
    setCities(newCities);
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
    if (isScrollAtBottom) {
      if (selectedCountry === "") {
        const newCities = await fetchUnfilteredCities(
          cities?.length,
          citiesPerPage
        );

        setCities((cities) => (cities ? [...cities, ...newCities] : cities));
      } else {
        const newCities = await fetchCountryCities(
          selectedCountry,
          cities?.length,
          citiesPerPage
        );

        setCities((cities) => (cities ? [...cities, ...newCities] : cities));
      }
    }
  };

  return (
    <div className="App">
      <h2>Cities App</h2>
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
        <Table cities={cities} handleScroll={handleTableScroll} />
      </div>
    </div>
  );
};

export default App;
