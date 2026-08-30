export interface Country {
  id: number;
  code: string;
  name: string;
}

export interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}

export interface State {
  id: number;
  name: string;
}

export interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}
