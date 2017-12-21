import * as React from 'react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import { rootReducer } from './reducers';
import { StoreState } from './model';
import history from './utils/history';
import App from './containers/app';
import { AsyncValueState } from './utils';
import './index.less';

const defaultRouterState: RouterState = {
  action: 'POP',
  location: {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    key: '',
  },
};

const defaultStoreState: StoreState = {
  appName: {value: '?', error: null, state: AsyncValueState.UNKNOWN },
  router: defaultRouterState,
  user: {
    username: null,
    isLoading: false,
    isAdmin: false,
    isAuthed: false
  }
};

const store = createStore<StoreState>(
  connectRouter(history)(rootReducer),
  defaultStoreState,
  applyMiddleware(routerMiddleware(history), thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

console.log('index.store');
console.log(store);

export { store };