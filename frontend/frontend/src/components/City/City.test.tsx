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

    expect(screen.getByText(/les Escaldes/i));
  });

  it("renders country name passed by prop", () => {
    render(
      <RowWrapper>
        <City name={FAKE_CITY.name} country={FAKE_CITY.country} />
      </RowWrapper>
    );

    expect(screen.getByText(/Andorra/i));
  });

  it("renders geonameid passed by prop", () => {
    render(
      <RowWrapper>
        <City name={FAKE_CITY.name} geoNameId={FAKE_CITY.geonameid} />
      </RowWrapper>
    );

    expect(screen.getByText(/3040051/i));
  });

  it("renders geonameid as a link", () => {
    render(
      <RowWrapper>
        <City name={FAKE_CITY.name} geoNameId={FAKE_CITY.geonameid} />
      </RowWrapper>
    );

    expect(screen.getByText(/3040051/i)).toHaveAttribute(
      "href",
      `https://www.geonames.org/${FAKE_CITY.geonameid}`
    );
  });

  it("renders subcountry passed by prop", () => {
    render(
      <RowWrapper>
        <City name={FAKE_CITY.name} subCountry={FAKE_CITY.subcountry} />
      </RowWrapper>
    );

    expect(screen.getByText(/Escaldes-Engordany/i));
  });
});
