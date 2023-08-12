export interface FlightsState {
  locations: ILocation[] | [];
  isLoading: boolean;
  searchedSourceLocationResults: ILocation[] | [];
  searchedDestinationLocationResults: ILocation[] | [];
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
