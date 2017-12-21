import { RouterState } from 'connected-react-router';
import { AsyncValue } from '../utils';
import { User } from '../model';

export interface StoreState {
  
  appName: AsyncValue<string>;

  router: RouterState;

  user: User;

}