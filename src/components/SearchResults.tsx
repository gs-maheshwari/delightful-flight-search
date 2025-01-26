import type { Airport, Flight } from "../types";

interface SearchResultsProps {
  flightOffer: Flight[];
  airports: Airport[];
}

const SearchResults = ({ flightOffer = [], airports = [] }: SearchResultsProps) => {
  const getAirportName = (code: string) => {
    const airport = airports.find((a) => a.ItemName === code);
    return airport ? airport.AirportName : code;
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-green-600">Search Results</h2>
      {flightOffer.length === 0 ? (
        <p>No flights found for the selected criteria.</p>
      ) : (
        <ul className="space-y-4">
          {flightOffer.map((flight: Flight) => {
            const { outboundFlight, pricingInfoSum } = flight;
            const {
              id,
              flightNumber,
              departureAirport,
              arrivalAirport,
              departureDateTime,
              arrivalDateTime,
              marketingAirline,
            } = outboundFlight;
            return (
              <li key={id} data-testid={id} className="rounded-md border p-4 shadow-md">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <span className="font-bold">
                      {getAirportName(departureAirport.locationCode)}
                    </span>
                    {" → "}
                    <span className="font-bold">
                      {getAirportName(arrivalAirport.locationCode)}
                    </span>
                  </div>
                  <div className="font-bold text-green-600">
                    <span data-testid={`${id}-price`}>{pricingInfoSum.totalPriceAllPassengers.toFixed(2)}</span>
                    &nbsp;{pricingInfoSum.currencyCode}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    Departure: {new Date(departureDateTime).toLocaleString()}
                  </p>
                  <p>Arrival: {new Date(arrivalDateTime).toLocaleString()}</p>
                  <p>
                    Flight: {marketingAirline.companyShortName} {flightNumber}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
