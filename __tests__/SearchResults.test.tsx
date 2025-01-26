import React from "react";
import { render, screen } from "@testing-library/react";
import SearchResults from "@/components/SearchResults";
import { mockAirports, mockFlightOffer } from '../__mocks__'

describe("SearchResults", () => {
  it("renders the search results title", () => {
    render(<SearchResults flightOffer={[]} airports={[]} />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("displays a message when no flights are found", () => {
    render(<SearchResults flightOffer={[]} airports={[]} />);
    expect(
      screen.getByText("No flights found for the selected criteria.")
    ).toBeInTheDocument();
  });

  it("renders flight information when flights are available", () => {
    render(
      <SearchResults flightOffer={mockFlightOffer} airports={mockAirports} />
    );

     const flightResultList = screen.getByTestId("AMSBUD20221110HV9911");
     expect(flightResultList).not.toBeEmptyDOMElement();

     const price = screen.getByTestId("AMSBUD20221110HV9911-price");
     expect(price).toHaveTextContent('64.17');
  });

  it('renders results unchanged', () => {
    const { container } = render(<SearchResults flightOffer={mockFlightOffer} airports={mockAirports}  />)
    expect(container).toMatchSnapshot()
  })
});
