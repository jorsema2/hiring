import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { City } from "./City";

const FAKE_CITY = {
  country: "Andorra",
  geonameid: 3040051,
  name: "les Escaldes",
  subcountry: "Escaldes-Engordany",
};

describe("City", () => {
  it("renders city name passed by prop", () => {
    render(<City name={FAKE_CITY.name} />);

    expect(screen.getByText(/les Escaldes/i));
  });
});
