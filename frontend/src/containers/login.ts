import { connect, Dispatch } from 'react-redux';
import { Login, PropFields, PropFunctions } from '../components/login';
import { StoreState } from '../model';
import * as Actions from '../actions';
import * as API from '../api';

function mapStateToProps(state: StoreState): PropFields {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch<Actions.Action>): PropFunctions {
  return {
    login: (username, password) => dispatch(API.login(username, password)),
    signup: (username, password) => dispatch(API.signup(username, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
