import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders sidebar title", async () => {
    render(<App />);

    const sidebarTitle = await screen.findByText(/cities app/i);

    expect(sidebarTitle).toBeInTheDocument();
  });
});
