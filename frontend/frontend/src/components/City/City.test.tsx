import { render, screen } from "@testing-library/react";
import { City } from "./City";

type WrapperProps = {
  children: React.ReactNode;
};

const FAKE_CITY = {
  country: "Andorra",
  geonameid: 3040051,
  name: "les Escaldes",
  subcountry: "Escaldes-Engordany",
};

const RowWrapper = ({ children }: WrapperProps) => {
  return (
    <table>
      <tbody>{children}</tbody>
    </table>
  );
};

describe("City", () => {
  it("renders city name passed by prop", () => {
    render(
      <RowWrapper>
        <City name={FAKE_CITY.name} />
      </RowWrapper>
    );

    const cityName = screen.getByText(/les Escaldes/i);

    expect(cityName).toBeInTheDocument();
  });

  it("renders country name passed by prop", () => {
    render(
      <RowWrapper>
        <City name={FAKE_CITY.name} country={FAKE_CITY.country} />
      </RowWrapper>
    );

    const countryName = screen.getByText(/Andorra/i);

    expect(countryName).toBeInTheDocument();
  });

  it("renders geonameid passed by prop", () => {
    render(
      <RowWrapper>
        <City name={FAKE_CITY.name} geoNameId={FAKE_CITY.geonameid} />
      </RowWrapper>
    );

    const geonameId = screen.getByText(/3040051/i);

    expect(geonameId).toBeInTheDocument();
  });

  it("renders subcountry passed by prop", () => {
    render(
      <RowWrapper>
        <City name={FAKE_CITY.name} subCountry={FAKE_CITY.subcountry} />
      </RowWrapper>
    );

    const subCountry = screen.getByText(/Escaldes-Engordany/i);

    expect(subCountry).toBeInTheDocument();
  });

  it("renders geonameid as a link", () => {
    render(
      <RowWrapper>
        <City name={FAKE_CITY.name} geoNameId={FAKE_CITY.geonameid} />
      </RowWrapper>
    );

    const geonameId = screen.getByText(/3040051/i);

    expect(geonameId).toHaveAttribute(
      "href",
      `https://www.geonames.org/${FAKE_CITY.geonameid}`
    );
  });
});
