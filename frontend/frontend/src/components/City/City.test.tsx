import { render, screen } from "@testing-library/react";
import City from "./City";

type WrapperProps = {
  children: React.ReactNode;
};

const FAKE_CITY = {
  country: "Andorra",
  geonameid: 3040051,
  name: "les Escaldes",
  subcountry: "Escaldes-Engordany",
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <table>
      <tbody>{children}</tbody>
    </table>
  );
};

describe("City", () => {
  it("renders city name passed by prop", () => {
    render(
      <Wrapper>
        <City name={FAKE_CITY.name} />
      </Wrapper>
    );

    const cityName = screen.getByText(/les Escaldes/i);

    expect(cityName).toBeInTheDocument();
  });

  it("renders country name passed by prop", () => {
    render(
      <Wrapper>
        <City name={FAKE_CITY.name} country={FAKE_CITY.country} />
      </Wrapper>
    );

    const countryName = screen.getByText(/Andorra/i);

    expect(countryName).toBeInTheDocument();
  });

  it("renders geonameid passed by prop", () => {
    render(
      <Wrapper>
        <City name={FAKE_CITY.name} geoNameId={FAKE_CITY.geonameid} />
      </Wrapper>
    );

    const geonameId = screen.getByText(/3040051/i);

    expect(geonameId).toBeInTheDocument();
  });

  it("renders subcountry passed by prop", () => {
    render(
      <Wrapper>
        <City name={FAKE_CITY.name} subCountry={FAKE_CITY.subcountry} />
      </Wrapper>
    );

    const subCountry = screen.getByText(/Escaldes-Engordany/i);

    expect(subCountry).toBeInTheDocument();
  });

  it("renders geonameid as a link", () => {
    render(
      <Wrapper>
        <City name={FAKE_CITY.name} geoNameId={FAKE_CITY.geonameid} />
      </Wrapper>
    );

    const geonameId = screen.getByText(/3040051/i);

    expect(geonameId).toHaveAttribute(
      "href",
      `https://www.geonames.org/${FAKE_CITY.geonameid}`
    );
  });
});
