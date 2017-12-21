import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './home';
import { Protected } from './protected';
import { User } from '../model';
import UserHome from '../containers/user-home';
import About from '../containers/about';
import Login from '../containers/login';
import requireAuth from './require-authed';
import requireNotAuth from './prevent-authed';

/* <Route path='/about/:id' component={About}/> */

export class RouterOutlet extends React.Component<Props> {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={this.props.user.isAuthed ? UserHome : Home}/>
        <Route exact path='/login' component={requireNotAuth(Login)}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/protected' component={requireAuth(Protected)}/>
        <Redirect to='/' />
      </Switch>
    );
  }
}

interface Props {

  user: User;

}