"use client";

import type React from "react";
import { useState, ChangeEvent, startTransition } from "react";

import type { Airport } from "../../types";
import Input, { InputProps } from "./Input";
import { useDebouncedCallback } from "use-debounce";

interface SearchInputProps extends InputProps {
  airports: Airport[];
}

const SearchInput = (props: SearchInputProps) => {
  const { id, label, name, onChange, airports, placeholder } = props;
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    filterAirports(value);

    if (onChange) {
      startTransition(() => {
        onChange({
          target: { name, value },
        } as ChangeEvent<HTMLInputElement>);
      });
    }
  };

  const filterAirports = useDebouncedCallback((inputValue: string) => {
    const filtered = airports.filter((airport) =>
      airport.ItemName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredAirports(filtered);
  }, 300);

  return (
    <div className="relative">
      <Input
        type="search"
        label={label}
        aria-label={label}
        id={id}
        data-testid={id}
        name={name}
        onChange={handleInputChange}
        placeholder={placeholder}
        list={`${id}-list`}
      />
      <datalist id={`${id}-list`} data-testid={`${id}-list`}>
        {filteredAirports.map((airport) => (
          <option key={airport.ItemName} value={airport.ItemName}>
            {airport.Description}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default SearchInput;
