import { CRUDOperation } from '../utils';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const STORE_LOGGED_IN_USER = 'STORE_LOGGED_IN_USER';

export const SAVE_APPLICATION_NAME = 'SAVE_APPLICATION_NAME';
export const LOAD_APPLICATION_NAME = 'LOAD_APPLICATION_NAME';
export const STORE_APPLICATION_NAME = 'STORE_APPLICATION_NAME';

export interface Action {

  type: string;

}

/** Implemented by actions that can update the store. */
export interface StoreAction {

  store: boolean;

}

export interface CRUDAction<V> extends Action {

  /** Only used when updating the value. */
  value: V | null;

  error?: string | null;

  operation: CRUDOperation;

}

export interface ApplicationNameAction extends CRUDAction<string> {

}

export interface LoginAction extends Action {

  username: string;

  password: string;

}

export interface LogoutAction extends Action {
}

export interface StoreLoggedInUserAction extends Action {

  username: string | null;

}

export function setApplicationNameAction(name: string | null): ApplicationNameAction {
  return {
    type: SAVE_APPLICATION_NAME,
    value: name,
    operation: CRUDOperation.U
  };
}

export function getApplicationNameAction(): ApplicationNameAction {
  return {
    type: LOAD_APPLICATION_NAME,
    operation: CRUDOperation.R,
    value: null
  };
}

export function storeApplicationNameAction(name: string | null, error: string | null): ApplicationNameAction {
  return {
    type: STORE_APPLICATION_NAME,
    operation: CRUDOperation.S,
    value: name,
    error
  };
}

export function login(username: string, password: string): LoginAction {
  return {
    type: LOGIN,
    username,
    password
  };

}

export function logout(): LogoutAction {
  return {
    type: LOGOUT
  };
}

export function loggedIn(username: string): StoreLoggedInUserAction {
  return {
    type: STORE_LOGGED_IN_USER,
    username
  };
}

export function loggedOut(): StoreLoggedInUserAction {
  return {
    type: STORE_LOGGED_IN_USER,
    username: null
  };
}
