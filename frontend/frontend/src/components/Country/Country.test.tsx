import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Country } from "./Country";

const callback = jest.fn();

const FAKE_COUNTRY = {
  name: "Afghanistan",
  count: 48,
};

describe("Country", () => {
  it("renders country name passed by prop", () => {
    render(
      <Country
        name={FAKE_COUNTRY.name}
        citiesNumber={FAKE_COUNTRY.count}
        onClick={callback}
      />
    );

    expect(screen.getByText(/afghanistan/i));
  });

  it("renders number of cities passed by prop", () => {
    render(
      <Country
        name={FAKE_COUNTRY.name}
        citiesNumber={FAKE_COUNTRY.count}
        onClick={callback}
      />
    );

    expect(screen.getByText(/48/i));
  });

  it("renders with orange background if isSelected is true", () => {
    render(
      <Country
        name={FAKE_COUNTRY.name}
        citiesNumber={FAKE_COUNTRY.count}
        isSelected
        onClick={callback}
      />
    );

    expect(screen.getByText(/48/i)).toHaveStyle("background-color: yellow");
  });

  it("renders with transparent background if isSelected is false", () => {
    render(
      <Country
        name={FAKE_COUNTRY.name}
        citiesNumber={FAKE_COUNTRY.count}
        isSelected={false}
        onClick={callback}
      />
    );

    expect(screen.getByText(/48/i)).toHaveStyle(
      "background-color: transparent"
    );
  });

  it("calls onClick callback when user clicks on it", () => {
    render(
      <Country
        name={FAKE_COUNTRY.name}
        citiesNumber={FAKE_COUNTRY.count}
        isSelected
        onClick={callback}
      />
    );

    userEvent.click(screen.getByText(/afghanistan/i));

    expect(callback).toHaveBeenCalled();
  });
});
