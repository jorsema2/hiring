import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders its title", async () => {
    render(<App />);

    const title = await screen.findByText(/cities app/i);

    expect(title).toBeInTheDocument();
  });
});
