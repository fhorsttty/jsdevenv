import * as React from 'react';

export interface Props {
  content: string;
};

export default class MyComponent extends React.Component<Props, object> {
  render() {
    return (
      <div>
        <h2>{this.props.content}</h2>
      </div>
    );
  }
};
