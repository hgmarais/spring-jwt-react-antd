import { connect, Dispatch } from 'react-redux';
import { UserHome, PropFields, PropFunctions } from '../components/user-home';
import { StoreState } from '../model';
import * as actions from '../actions';

function mapStateToProps(state: StoreState): PropFields {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>): PropFunctions {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
