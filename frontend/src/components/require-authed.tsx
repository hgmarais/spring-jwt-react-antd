import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../model';
import history from '../utils/history';

interface Props {
  authenticated: boolean;
}

export default function(ComposedComponent: any) {
  class Authentication extends React.Component<Props> {
    componentWillMount() {
      console.log('Auth.componentWillMount : ' + this.props.authenticated);
      if (!this.props.authenticated) {
        history.push('/login');
      }
    }

    componentWillUpdate(nextProps: Props) {
      console.log('Auth.componentWillUpdate : ' + nextProps.authenticated);
      if (!nextProps.authenticated) {
        history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state: StoreState) {
    return { authenticated: state.user.isAuthed };
  }

  return connect(mapStateToProps)(Authentication);
}
