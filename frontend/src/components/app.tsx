import './app.less';
import * as React from 'react';
import { Layout, Menu } from 'antd';
import { RouterState } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { RouterOutlet } from './router-outlet';
import { User } from '../model';

const { Header, Content } = Layout;

/**
 * Represents the top level component. It has the navigation bar an instance
 * of RouterOutlet to show the current route.
 */
export class App extends React.Component<Props, State> {

  static KEYS = ['/', '/about', '/login', '/protected'];

  extractMenuKey(path: string): string | undefined {
    let max = '';

    for (const key of App.KEYS) {
      if (path.startsWith(key) && (key.length > max.length)) {
        max = key;
      }
    }

    return max === '' ? undefined : max;
  }

  logout() {
    this.props.logout();
  }

  render() {
    const menuKey = this.extractMenuKey(this.props.router.location.pathname);
    const selectedMenuKeys = menuKey ? [menuKey] : ['/'];
    const authed = this.props.user.isAuthed;

    if (!authed) {
      return (<RouterOutlet user={this.props.user}/>);
    }

    return (
      <Layout className='hgm-app'>
        <Header className='header'>
            <Menu
              className='menu'
              theme='dark'
              mode='horizontal'
              selectedKeys={selectedMenuKeys}
              defaultSelectedKeys={['/']} >
                <Menu.Item key='/'><Link to='/'>Home</Link></Menu.Item>
                <Menu.Item key='/about'><Link to='/about'>About</Link></Menu.Item>
                {!authed && <Menu.Item key='/login'><Link to='/login'>Login</Link></Menu.Item>}
                {authed && <Menu.Item key='/protected'><Link to='/protected'>Protected</Link></Menu.Item>}
            </Menu>

            <a className='logout' onClick={() => this.logout()}>Log out</a>
          </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <RouterOutlet user={this.props.user}/>
        </Content>
      </Layout>
    );

  }

}

export interface PropFields {

  router: RouterState;

  user: User;
  
}

export interface PropFunctions {

  logout(): void;

}

export interface Props extends PropFields, PropFunctions {
}

export interface State {
}
