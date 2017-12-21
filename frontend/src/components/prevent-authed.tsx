import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../model';
import history from '../utils/history';

interface Props {
  authenticated: boolean;
}

export default function(ComposedComponent: any) {
  class NotAuthentication extends React.Component<Props> {
    componentWillMount() {
      if (this.props.authenticated) {
        history.push('/');
      }
    }

    componentWillUpdate(nextProps: Props) {
      if (nextProps.authenticated) {
        history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state: StoreState) {
    return { authenticated: state.user.isAuthed };
  }

  return connect(mapStateToProps)(NotAuthentication);
}
