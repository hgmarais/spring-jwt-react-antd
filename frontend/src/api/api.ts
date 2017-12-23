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

// function postBody(url: string, body: any): Promise<Response> {
//   return fetch('http://localhost:' + port + url, {
//     method: 'post',
//     headers: new Headers({
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization':  'Bearer ' + localStorage.getItem('token')
//     }),
//     body: JSON.stringify(body)
//   });
// }

function post(url: string): Promise<Response> {
  return fetch('http://localhost:' + port + url, {
    method: 'post',
    headers: new Headers({
      Authorization:  'Bearer ' + localStorage.getItem('token')
    })
  });
}

export function saveApplicationName(name: string): Promise<Response> {
  return put('/api/app/name/' + name);
}

export function getApplicationName(): Promise<Response> {
  return get('/api/app/name');
}

export function login(username: string, password: string) {
  return post('/api/authentication?username=' + username + '&password=' + btoa(password));
}

export function logout() {
  return post('/api/logout');
}
