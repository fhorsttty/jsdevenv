import React, { Component } from 'react';

export default class MyComponent extends Component {
  render() {
    return (
      <div>
        <p>{this.props.content}</p>
      </div>
    );
  }
}
