import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import generateCountriesMother from "./test/mothers/generateCountriesMother";
import generateCitiesMother from "./test/mothers/generateCitiesMother";
import fetchCountries from "./services/fetchCountries";
import fetchCities from "./services/fetchCities";

jest.mock("./services/fetchCountries");
jest.mock("./services/fetchCities");

const COUNTRIES = generateCountriesMother();
const CITIES = generateCitiesMother();

describe("App", () => {
  it("renders its title", async () => {
    render(<App />);

    const title = await screen.findByText(/cities app/i);

    expect(title).toBeInTheDocument();
  });

  it("shows countries", async () => {
    fetchCountries.mockResolvedValue(COUNTRIES);
    render(<App />);

    const firstCountry = await screen.findByText(/andorra/i);
    const secondCountry = await screen.findByText(/afghanistan/i);

    expect(firstCountry).toBeInTheDocument();
    expect(secondCountry).toBeInTheDocument();
  });

  it("country changes background color when it is clicked and fetcbes cities of that country", async () => {
    fetchCountries.mockResolvedValue(COUNTRIES);
    fetchCities.mockResolvedValue(CITIES);

    render(<App />);

    const country = await screen.findByText(/anguilla/i);

    expect(country).toBeInTheDocument();

    userEvent.click(country);

    const city = await screen.findByText(/les escaldes/i);

    expect(country).toHaveStyle("background-color: yellow");

    expect(city).toBeInTheDocument();
  });
});
