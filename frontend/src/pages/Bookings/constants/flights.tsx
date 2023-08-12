export interface FlightsState {
  locations: ILocation[] | [];
  isLoading: boolean;
  searchedSourceLocationResults: ILocation[] | [];
  searchedDestinationLocationResults: ILocation[] | [];
  flights: IFlight[] | [];
}
export interface SeatsState {
  seats: [];
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
