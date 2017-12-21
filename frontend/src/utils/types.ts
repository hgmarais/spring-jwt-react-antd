export enum CRUDOperation {
  C, R, U, D, S
}

export enum AsyncValueState {

  READING,

  WRITING,

  ERROR,

  VALID,

  UNKNOWN

}

export interface AsyncValue<V> {

  value: V | null;

  error: string | null;

  state: AsyncValueState;

}

export interface Location {

  pathname: string;
  
  search: string;
  
  hash: string;
  
  key: string;

}

export interface URLPropsInterface {

  location: Location;

  match?: {
    params: {}
  };

}

export class URLPropsWrapper {

  urlParams: URLSearchParams;

  constructor(private props: URLPropsInterface) {
    this.urlParams = new URLSearchParams(props.location.search);
  }

  getPathParam(name: string): string | null {
    return this.props.match ? this.props.match.params[name] : null;
  }

  getNumberPathParam(name: string): number | null {
    const value = this.getPathParam(name);
    return value ? +value : null;
  }

  getURLParam(name: string): string | null {
    return this.urlParams.get(name);
  }

  getNumberURLParam(name: string): number | null {
    const value = this.getURLParam(name);
    return value ? +value : null;
  }

}
