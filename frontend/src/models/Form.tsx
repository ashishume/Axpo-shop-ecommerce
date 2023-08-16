export interface FormInputs {
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
}

export interface ISearchFlights {
  sourceAirport: string;
  destinationAirport: string;
  fromDate: string;
  passengersCount: string;
}
