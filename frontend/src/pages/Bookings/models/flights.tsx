export interface FlightsState {
  locations: ILocation[] | [];
  isLoading: boolean;
  searchedSourceLocationResults: ILocation[] | [];
  searchedDestinationLocationResults: ILocation[] | [];
  flights: IFlight[] | [];
  flight: IFlight | null;
}
export interface SeatsState {
  seats: ISeats | null;
  isLoading: boolean;
}

export interface ILocation {
  id: number;
  location: string;
  airport: string;
}

export interface IFlight {
  _id: string;
  flightNo: string;
  brand: string;
  brandLogo: string;
  sourceAirport: string;
  destinationAirport: string;
  sourceLocation?: string;
  destinationLocation?: string;
  fromTime: string;
  toTime: string;
  timeDiff: string;
  price: string;
}

export interface ISeats {
  _id: string;
  flight: string;
  seatStructure: [
    {
      columns: IColumn[];
      id: number;
      _id: number;
    },
  ];
  fromDate: string;
}

export interface IColumn {
  seatId: string;
  isBooked: boolean;
  _id: string;
}
