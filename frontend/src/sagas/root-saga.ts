import { call, put, takeEvery } from 'redux-saga/effects';
import * as Actions from '../actions';
import * as API from '../api';
import history from '../utils/history';

function* saveApplicationName(action: Actions.ApplicationNameAction): IterableIterator<any> {
  try {
    yield call(API.saveApplicationName, action.value);
    yield put(Actions.storeApplicationNameAction(action.value, null));
  } catch (error) {
    yield put(Actions.storeApplicationNameAction(null, error));
  }
}

function* loadApplicationName(): IterableIterator<any> {
  try {
    const response = yield call(API.getApplicationName);
    const name = yield response.text();
    yield put(Actions.storeApplicationNameAction(name, null));
  } catch (error) {
    yield put(Actions.storeApplicationNameAction(null, error));
  }
}

function* login(action: Actions.LoginAction): IterableIterator<any> {
  try {
    const response = yield call(API.login, action.username, action.password);
    const json = yield response.json();
    /* Store the token received from the server. */
    localStorage.setItem('token', json.token);

    /* Notify the reducer that the user has logged in. */
    yield put(Actions.loggedIn(action.username));

    /* Navigate to the root so that the user can see their user specifc landing page. */
    history.push('/');
    
    /* Now that we're logged in the application name can be acquired. */
    yield loadApplicationName();
  } catch (error) {
    console.log(error);
  }
}

function* logout(): IterableIterator<any> {
  localStorage.removeItem('token');
  yield put(Actions.loggedOut());
  history.push('/');
}

function* loginSaga(): IterableIterator<any> {
  yield takeEvery(Actions.LOGIN, login);
}

function* logoutSaga(): IterableIterator<any> {
  yield takeEvery(Actions.LOGOUT, logout);
}

function* loadApplicationNameSaga(): IterableIterator<any> {
  yield takeEvery(Actions.LOAD_APPLICATION_NAME, loadApplicationName);
}

function* saveApplicationNameSaga(): IterableIterator<any> {
  yield takeEvery(Actions.SAVE_APPLICATION_NAME, saveApplicationName);
}

export default function* rootSaga() {
  yield [
    loginSaga(),
    logoutSaga(),
    saveApplicationNameSaga(),
    loadApplicationNameSaga()
  ];
}