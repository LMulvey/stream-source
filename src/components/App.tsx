import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {
  DonateCTA,
  DonationGoal,
  MostRecentDonation,
  TopDonation,
} from './ExtraLife';
import { Stats } from './SOT';
import { Timer } from './Timer';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family: 'Fredoka One', cursive;
    font-size: 24px;
    height: 100%;
    max-height: 100vh;
    overflow: hidden;
    padding: 0 24px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 444px auto 444px;
  column-gap: 44px;
`;

const ScreenContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-end;

  & > * {
    margin: 16px 0;
  }
`;

export const App = () => {
  return (
    <Grid>
      <GlobalStyle />
      <ScreenContainer>
        <DonateCTA />
        <DonationGoal />
        <TopDonation />
        <MostRecentDonation />
      </ScreenContainer>
      <ScreenContainer />
      <ScreenContainer>
        <Stats />
        <Timer />
      </ScreenContainer>
    </Grid>
  );
};
