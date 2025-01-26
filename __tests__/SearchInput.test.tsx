import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { SearchInput } from "@/components/ui";
import { mockAirports } from '../__mocks__'

describe("SearchInput", () => {
  it("renders the input field with label", () => {
    render(
      <SearchInput
        label="Origin"
        id="origin"
        name="origin"
        airports={mockAirports}
      />
    );
    expect(screen.getByLabelText("Origin")).toBeInTheDocument();
  });

  it("filters airports based on user input", () => {
    render(
      <SearchInput
        label="Origin"
        id="origin"
        name="origin"
        airports={mockAirports}
      />
    );

    const input = screen.getByTestId("origin");
    fireEvent.change(input, { target: { value: "AMS" } });

    const datalist = screen.getByTestId(`origin-list`);
    const options = datalist.querySelectorAll("option");
    const hasAMS = Array.from(options).some((option) => option.value === "AMS");

    expect(hasAMS).toBe(true);
  });


  it("calls onChange handler when input value changes", () => {
    const mockOnChange = jest.fn();
    render(
      <SearchInput
        label="Origin"
        id="origin"
        name="origin"
        airports={mockAirports}
        onChange={mockOnChange}
      />
    );

    const input = screen.getByTestId("origin");
    fireEvent.change(input, { target: { value: "AMS" } });

    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
