import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Card } from './Card';
import { DonationGoal } from './DonationGoal';
import { MostRecentDonation } from './MostRecentDonation';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family: 'Fredoka One', cursive;
    font-size: 24px;
    height: 100%;
    max-height: 100vh;
    overflow: hidden;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

const ScreenContainer = styled.div`
  width: 444px;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;

  & > * {
    margin: 16px 0;
  }
`;

export const App = () => {
  return (
    <ScreenContainer>
      <GlobalStyle />
      <DonationGoal />
      <MostRecentDonation />
    </ScreenContainer>
  );
};
