import * as React from 'react';

export interface Props {
  content: string;
};

export default class MyComponent extends React.Component<Props, object> {
  render() {
    return (
      <div>
        <h1>{this.props.content}</h1>
      </div>
    );
  }
};
