import './login.less';
import * as React from 'react';
import { Card, Form, Input, Icon, Button } from 'antd';
const FormItem = Form.Item;
import {FormComponentProps} from 'antd/lib/form/Form';

class LoginForm extends React.Component<Props & FormComponentProps> {

  componentDidMount() {
    // this.props.form.validateFields((err, values) => {
    //   console.log(err);
    //   console.log(values);
    // });

    // To disabled submit button at the beginning.
    this.props.form.setFields({
      username: { value: '' },
      password: { value: '' }
    });

  }

  handleSubmit(e: any) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values.username, values.password);
      }
    });
  }

  hasErrors(fieldsError: any): boolean {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  submitDisabled(): boolean {
    const { getFieldsError, getFieldValue } = this.props.form;

    const username = getFieldValue('username');
    const password = getFieldValue('password');

    // if (!isFieldTouched('username') || !isFieldTouched('password')) {
    //   return true;
    // }

    if ((username && username.length === 0) || (password && password.length === 0)) {
      return true;
    }

    return this.hasErrors(getFieldsError());
  }

  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout='vertical' onSubmit={e => this.handleSubmit(e)}>
        <FormItem
          validateStatus={usernameError ? 'error' : undefined}
          help={usernameError || ''}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type='user'
              style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : undefined}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input 
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password' placeholder='Password' />
          )}
        </FormItem>
        <Button
          className='login-button'
          type='primary'
          htmlType='submit'
          disabled={this.submitDisabled()}>
          Login
        </Button>
      </Form>
    );
  }

}

const WrappedLoginForm = Form.create<Props>()(LoginForm);

export class Login extends React.Component<Props> {

  getTitle() {
    return (
      <div className='title'>
        <Icon type='bulb'/>
        <span className='text'>Application</span>
      </div>
    );
  }

  render() {
    return (
      <div className='hgm-login'>
        <Card className='card' title={this.getTitle()}>
          <WrappedLoginForm {... this.props}/>
        </Card>
      </div>
    );
  }
}

export interface PropFields {

}

export interface PropFunctions {

  login(username: string, password: string): void;

}

export interface Props extends PropFields, PropFunctions {
}
