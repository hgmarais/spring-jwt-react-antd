import * as React from 'react';
import { User } from '../model';

export class UserHome extends React.Component<Props, State> {

  render() {
    const rows = [];
    for (let i = 0; i < 500; i++) {
        rows.push(<div key={i}>{i}</div>);
    } 

    return (
       <div>
        <div>{`Welcome home ${this.props.user.username}`}</div>
        {rows}
      </div>
    );
  }

}

export interface PropFields {

  user: User;
  
}

export interface PropFunctions {
}

export interface Props extends PropFields, PropFunctions {
}

export interface State {
}
