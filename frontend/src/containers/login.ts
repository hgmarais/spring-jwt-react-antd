import { connect, Dispatch } from 'react-redux';
import { Login, PropFields, PropFunctions } from '../components/login';
import { StoreState } from '../model';
import * as Actions from '../actions';

function mapStateToProps(state: StoreState): PropFields {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch<Actions.Action>): PropFunctions {
  return {
    login: (username, password) => dispatch(Actions.login(username, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
