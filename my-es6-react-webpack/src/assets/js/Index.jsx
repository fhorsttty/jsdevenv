import React from 'react';
import { render } from 'react-dom';
import Hello from './Hello';

render(
  <Hello content="Hello World!!" />,
  document.getElementById('app'),
);
