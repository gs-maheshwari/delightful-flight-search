export const mockAirports = [
  {
    ItemName: "AMS",
    AirportName: "Amsterdam",
    Description: "Amsterdam, Netherlands",
  },
  {
    ItemName: "BUD",
    AirportName: "Budapest",
    Description: "Budapest, Hungary",
  },
];


export const mockFlightOffer = [
    {
      outboundFlight: {
        id: "AMSBUD20221110HV9911",
        departureDateTime: "2022-11-10T08:00:00",
        arrivalDateTime: "2022-11-10T09:55:00",
        marketingAirline: {
          companyShortName: "HV",
        },
        flightNumber: 9911,
        departureAirport: {
          locationCode: "AMS",
        },
        arrivalAirport: {
          locationCode: "BUD",
        },
      },
      pricingInfoSum: {
        totalPriceAllPassengers: 64.17,
        totalPriceOnePassenger: 64.17,
        baseFare: 27.13,
        taxSurcharge: 37.04,
        currencyCode: "EUR",
        productClass: "Basic",
      },
      deeplink: {
        href: "https://www.transavia.com/nl-NL/bookingtool/flights/deeplink?ds=AMS&as=BUD&ap=1&cp=0&od=10&om=11&oy=2022&utm_source=API&utm_medium=Public GOS",
      },
    },
  ];
