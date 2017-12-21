import './home.less';
import * as React from 'react';
import history from '../utils/history';
const logo = require('../assets/images/image.jpg');
import { Icon, Layout } from 'antd';
const { Header, Content, Footer } = Layout;

export class Home extends React.Component {

  login() {
    history.push('/login');
  }

  render() {
    return (
      <Layout className='hgm-home'>
        <Header className='header'>
          <div className='logo'>
           <Icon type='bulb'/>
           <span className='text'>Application</span>
          </div>
          <a className='login' onClick={() => this.login()}>Login</a>
        </Header>
        <Content className='content'>
          <img src={logo}></img>
        </Content>
        <Footer className='footer'>
          Footer
        </Footer>
      </Layout>
    );
  }
}
