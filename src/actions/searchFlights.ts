'use server';

import { Flight } from '@/types';
import flightsData from '@/data/flights-from-AMS.json';

export async function searchFlights(prevState: unknown, formData: FormData) {
  const searchParams = Object.fromEntries(formData);

  const { origin, destination, departureDate } = searchParams;
  const flightOffer = flightsData.flightOffer.filter((flight: Flight) => {
    const { departureAirport, arrivalAirport, departureDateTime  } = flight.outboundFlight;
    return (
      departureAirport.locationCode === origin &&
      arrivalAirport.locationCode === destination &&
      departureDateTime.split("T")[0] === departureDate
    );
  });

  return { flightOffer };
}
