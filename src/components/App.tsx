import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Card } from './Card';
import { Donations } from './Donations';

createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family: 'Fredoka One', cursive;
      font-size: 18px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

export const App = () => {
  return (
    <div>
      <Donations />
    </div>
  );
};
