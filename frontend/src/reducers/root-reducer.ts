import * as Actions from '../actions';
import { createDefaultUser } from '../model';
import { StoreState } from '../model';
import { CRUDOperation, AsyncValue, AsyncValueState } from '../utils';

export function rootReducer(state: StoreState, action: Actions.Action): StoreState {
  if (action.type === Actions.STORE_APPLICATION_NAME) {
    return reduceApplicationName(state, action as Actions.ApplicationNameAction);
  } else if (action.type === Actions.STORE_LOGGED_IN_USER) {
    return reduceLoggedInUser(state, action as Actions.StoreLoggedInUserAction);
  }

  return state;
}

function reduceApplicationName(state: StoreState, action: Actions.ApplicationNameAction) {
  const appName = { ...state.appName };
  applyCRUDActionToValue(action, appName);
  return { ...state, appName }; 
}

function reduceLoggedInUser(state: StoreState, action: Actions.StoreLoggedInUserAction) {
  /* User logged out. */
  if (!action.username) {
    return {...state, user: createDefaultUser()};
  }

  /* User logged in. */
  const user = { ...state.user };
  user.username = action.username;
  user.isAuthed = true;
  return { ...state, user};
}

function applyCRUDActionToValue<V>(action: Actions.CRUDAction<V>, value: AsyncValue<V>) {
  if (action.operation === CRUDOperation.R) {
    value.state = AsyncValueState.READING;
  } else if (action.operation === CRUDOperation.U) {
    value.state = AsyncValueState.WRITING;
  } else if (action.operation === CRUDOperation.S) {
    if (action.error) {
      value.error = action.error;
      value.state = AsyncValueState.ERROR;
    } else {
      value.value = action.value;
      value.state = AsyncValueState.VALID;
    }
  }
}
