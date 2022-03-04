import { render, screen } from "@testing-library/react";
import App from "./App";
import generateCountriesMother from "./test/mothers/generateCountriesMother";
import fetchCountries from "./services/fetchCountries";

jest.mock("./services/fetchCountries");
jest.mock("./services/fetchCountryCities");
jest.mock("./services/fetchUnfilteredCities");

const COUNTRIES = generateCountriesMother();

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
});
