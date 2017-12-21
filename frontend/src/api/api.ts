import { Dispatch } from 'react-redux';
import * as Actions from '../actions';
import history from '../utils/history';
import { store } from '../index';

const port = 8081;

function get(url: string): Promise<Response> {
  console.log('get : ' + url + ' ' + localStorage.getItem('token'));
  return fetch('http://localhost:' + port + url, {
    headers: new Headers({
      Authorization:  'Bearer ' + localStorage.getItem('token')
    })
  });
}

function put(url: string): Promise<Response> {
  return fetch('http://localhost:' + port + url, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization':  'Bearer ' + localStorage.getItem('token')
    })
  });
}

function postBody(url: string, body: any): Promise<Response> {
  return fetch('http://localhost:' + port + url, {
    method: 'post',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization':  'Bearer ' + localStorage.getItem('token')
    }),
    body: JSON.stringify(body)
  });
}

function post(url: string): Promise<Response> {
  return fetch('http://localhost:' + port + url, {
    method: 'post',
    headers: new Headers({
      Authorization:  'Bearer ' + localStorage.getItem('token')
    })
  });
}

export function setApplicationName(name: string) {

  return (dispatch: Dispatch<Actions.ApplicationNameAction>) => {
    dispatch(Actions.setApplicationNameAction(name));

    return put('/api/app/name/' + name)
      .then(text => dispatch(Actions.storeApplicationNameAction(name, null)))
      .catch(error => dispatch(Actions.storeApplicationNameAction(null, error)));
  };

}

export function getApplicationName() {
  console.log('getApplicationName');
  return (dispatch: Dispatch<Actions.ApplicationNameAction>) => {
    dispatch(Actions.getApplicationNameAction());

    return get('/api/app/name')
      .then(response => response.text())
      .then(text => dispatch(Actions.storeApplicationNameAction(text, null)))
      .catch(error => {
        console.log('getApplicationName error');
        console.log(error);
        dispatch(Actions.storeApplicationNameAction(null, error));
      });
  };
}

export function login(username: string, password: string) {
  return (dispatch: Dispatch<Actions.LoginAction>) => {
    return post('/api/authentication?username=' + username + '&password=' + btoa(password))
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw data.error;
        }
        
        /* Store the token received from the server. */
        localStorage.setItem('token', data.token);

        /* Notify the reduces that the user has logged in. */
        dispatch(Actions.loginAction(username));

        /* Navigate to the root so that the user can see their user specifc landing page. */
        history.push('/');
        
        /* Now that we're logged in the application name can be acquired. */
        // store.dispatch(getApplicationName());
      })
      .then(() => store.dispatch(getApplicationName()))
      .catch(error => console.log(error));
  };

}

export function logout() {
  return (dispatch: Dispatch<Actions.LogoutAction>) => {
    localStorage.removeItem('token');
    dispatch(Actions.logoutAction());
    history.push('/');
    // return post('/api/logout')
    //   .then(response => {
    //     localStorage.removeItem('token');
    //     dispatch(Actions.logoutAction());
    //     history.push('/');
    //   })
    //   .catch(error => console.log(error));
  };
}

export function signup(username: string, password: string) {
  return (dispatch: Dispatch<Actions.LoginAction>) => {
    return postBody('/users/signup', {username, password})
      .then(response => console.log(response))
      .then(error => console.log(error));
  };

}
