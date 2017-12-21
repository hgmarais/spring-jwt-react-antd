import { CRUDOperation } from '../utils';

export const LOGIN_ACTION = 'LOGIN_ACTION';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';
export const APPLICATION_NAME_ACTION = 'APPLICATION_NAME_ACTION';

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

export function setApplicationNameAction(name: string | null): ApplicationNameAction {
  return {
    type: APPLICATION_NAME_ACTION,
    value: name,
    operation: CRUDOperation.U
  };
}

export function getApplicationNameAction(): ApplicationNameAction {
  return {
    type: APPLICATION_NAME_ACTION,
    operation: CRUDOperation.R,
    value: null
  };
}

export function storeApplicationNameAction(name: string | null, error: string | null): ApplicationNameAction {
  return {
    type: APPLICATION_NAME_ACTION,
    operation: CRUDOperation.S,
    value: name,
    error
  };
}

export interface LoginAction extends Action {

  username: string;

}

export interface LogoutAction extends Action {
}

export function loginAction(username: string): LoginAction {
  return {
    type: LOGIN_ACTION,
    username
  };

}

export function logoutAction(): LogoutAction {
  return {
    type: LOGOUT_ACTION
  };
}