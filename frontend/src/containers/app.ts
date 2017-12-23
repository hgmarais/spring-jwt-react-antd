import { connect, Dispatch } from 'react-redux';
import { App, PropFields, PropFunctions } from '../components/app';
import { StoreState } from '../model';
import * as Actions from '../actions';

function mapStateToProps(state: StoreState): PropFields {
  return {
    router: state.router,
    user: state.user
  };
}

function mapDispatchToProps(dispatch: Dispatch<Actions.Action>): PropFunctions {
  return {
    logout: () => dispatch(Actions.logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
