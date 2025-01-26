"use client";

import { startTransition, useActionState, useState } from "react";
import { z } from "zod";
import { useDebouncedCallback } from 'use-debounce';
import { Airport, SearchParams } from "@/types";
import { searchFlights } from "@/actions";

import { Input, SearchButton, SearchInput } from "./ui";
import SearchResults from "./SearchResults";
import { useRouter } from "next/navigation";

const initialState = {
  flightOffer: [],
};

const searchFormSchema = z
  .object({
    origin: z.string().min(3, "Origin is required"),
    destination: z.string().min(3, "Destination is required"),
    departureDate: z.string().min(3, "Departure date is required"),
  })
  .refine((data) => data.origin !== data.destination, {
    message: "Origin and destination cannot be the same",
    path: ["destination"],
  });

const SearchForm = ({ airports }: { airports: Airport[] }) => {
  const [state, formAction, pending] = useActionState(
    searchFlights,
    initialState
  );
  const [formData, setFormData] = useState<SearchParams>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof SearchParams, string[]>>
  >({});
  const { push } = useRouter();

  const handleInputChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: [] }));
  }, 300);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = searchFormSchema.safeParse(formData);

    if (!validationResult.success) {
      setErrors(validationResult.error.flatten().fieldErrors);
      return;
    }

    startTransition(() => {
      const { origin, destination, departureDate } = formData;
      push(`?origin=${origin}&destination=${destination}&departureDate=${departureDate}`);
      formAction(new FormData(e.currentTarget));
    });
  };

  return (
    <>
      <form
        role="search"
        onSubmit={handleSubmit}
        className="mx-auto mb-8 flex flex-col items-center"
      >
        <div className="flex flex-wrap items-end gap-4">
          <div className="relative flex w-auto flex-grow flex-col">
            <SearchInput
              label="Origin"
              id="origin"
              name="origin"
              onChange={handleInputChange}
              airports={airports}
              placeholder="Enter origin"
            />
            {errors.origin && (
              <span data-testid='error-origin' className="absolute top-full mt-1 text-sm text-red-500">
                {errors.origin}
              </span>
            )}
          </div>

          <div className="relative flex w-auto flex-grow flex-col">
            <SearchInput
              label="Destination"
              id="destination"
              name="destination"
              onChange={handleInputChange}
              airports={airports}
              placeholder="Enter destination"
            />
            {errors.destination && (
              <span data-testid='error-destination' className="absolute top-full mt-1 text-sm text-red-500">
                {errors.destination}
              </span>
            )}
          </div>

          <div className="relative flex w-auto flex-grow flex-col">
            <Input
              type="date"
              onChange={handleInputChange}
              label="Departure Date"
              id="departureDate"
              data-testid="departureDate"
              name="departureDate"
            />
            {errors.departureDate && (
              <span data-testid='error-departureDate' className="absolute top-full mt-1 text-sm text-red-500">
                {errors.departureDate}
              </span>
            )}
          </div>

          <div className="flex w-auto">
            <SearchButton data-testid='searchButton' />
          </div>
        </div>
      </form>
      {state !== initialState && !pending && (
        <SearchResults flightOffer={state.flightOffer} airports={airports} />
      )}
    </>
  );
};

export default SearchForm;
