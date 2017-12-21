import * as React from 'react';
import { Button } from 'antd';
import { AsyncValue, AsyncValueState } from '../utils';

export class About extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  setAppName() {
    this.props.setAppName(this.props.appName.value + 'x');
  }

  getAppName() {
    this.props.getAppName();
  }

  render() {
    let appName: string | null = '';
    
    switch (this.props.appName.state) {
      case AsyncValueState.READING: appName = 'Busy...'; break;
      case AsyncValueState.VALID: appName = this.props.appName.value; break;
      case AsyncValueState.ERROR: appName = this.props.appName.error; break;
      default: appName = this.props.appName.value; break;
    }

    console.log(appName);

    return (
      <div>
        <div>How about that!</div>
        <div>{appName}</div>
        <Button disabled={this.props.appName.state !== AsyncValueState.VALID}
          onClick={() => this.setAppName()}>Set app name</Button>
        <Button onClick={() => this.getAppName()}>Get app name</Button>
      </div>
    );
  }
}

export interface PropFields {

    appName: AsyncValue<string>;

  }

export interface PropFunctions {

  setAppName(name: string): void;

  getAppName(): void;

}

export interface Props extends PropFields, PropFunctions {
}

export interface State {

}
