import { connect, Dispatch } from 'react-redux';
import { About, PropFields, PropFunctions } from '../components/about';
import { StoreState } from '../model';
import * as Actions from '../actions';
// import * as API from '../api';

function mapStateToProps(state: StoreState): PropFields {
  return {
    appName: state.appName
  };
}

function mapDispatchToProps(dispatch: Dispatch<Actions.Action>): PropFunctions {
  return {
    setAppName: name => dispatch(Actions.setApplicationNameAction(name)),
    getAppName: () => dispatch(Actions.getApplicationNameAction())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
