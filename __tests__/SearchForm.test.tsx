import React from "react";
import { mockAirports } from "../__mocks__";
import SearchForm from "@/components/SearchForm";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

jest.mock("@/actions", () => ({
  searchFlights: jest.fn(),
}));

describe("SearchForm Component", () => {
  it("renders the form", () => {
    render(<SearchForm airports={mockAirports} />);

    expect(screen.getByRole("search")).toBeInTheDocument();
  });

  it("shows validation errors if form is submitted with empty fields", async () => {
    render(<SearchForm airports={mockAirports} />);

    const searchButton = screen.getByTestId("searchButton");
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByTestId("error-origin")).toBeInTheDocument();
      expect(screen.getByTestId("error-destination")).toBeInTheDocument();
      expect(screen.getByTestId("error-departureDate")).toBeInTheDocument();
    });
  });

  it("shows validation error when origin and destination are the same", async () => {
    render(<SearchForm airports={mockAirports} />);

    fireEvent.change(screen.getByTestId("origin"), {
      target: { value: "AMS" },
    });
    fireEvent.change(screen.getByTestId("destination"), {
      target: { value: "AMS" },
    });
    fireEvent.change(screen.getByTestId("departureDate"), {
      target: { value: "2025-01-31" },
    });

    fireEvent.click(screen.getByTestId("searchButton"));

    await waitFor(() => {
      expect(
        screen.getByText("Origin and destination cannot be the same")
      ).toBeInTheDocument();
    });
  });

  it("clears validation errors when input is corrected", async () => {
    render(<SearchForm airports={mockAirports} />);

    fireEvent.change(screen.getByTestId("origin"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByTestId("destination"), {
      target: { value: "AMS" },
    });
    fireEvent.change(screen.getByTestId("departureDate"), {
      target: { value: "2025-01-31" },
    });

    fireEvent.click(screen.getByTestId("searchButton"));

    await waitFor(() => {
      expect(screen.getByTestId("error-origin")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId("origin"), {
      target: { value: "JFK" },
    });

    await waitFor(() => {
      expect(screen.getByTestId("error-origin")).toBeEmptyDOMElement();
    });
  });

  it("does not render SearchResults when there is no data", () => {
    render(<SearchForm airports={mockAirports} />);

    expect(screen.queryByTestId("search-results")).not.toBeInTheDocument();
  });
});
