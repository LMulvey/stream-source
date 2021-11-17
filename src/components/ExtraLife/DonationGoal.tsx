import React from 'react';
import { getUserInfo, IExtraLifeUser } from 'extra-life-api';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { API_POLLING_MS, PARTICIPANT_ID } from '../../utils/constants';
import styled, { css } from 'styled-components';
import { Card } from '../Card';
import { formatCurrency } from '../../utils/money';

const GoalContainer = styled.div`
  border: 6px solid #000000;
  border-radius: 16px;
  height: 48px;
`;

const Amounts = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: space-between;
  color: white;
  position: relative;
  top: -50%;
  transform: translateY(-50%);
  left: 0;
  padding: 0 8px;
`;

const Meter = styled.div<{ width: string }>`
  ${({ width }) => css`
    background: #ed213a;
    background: -webkit-linear-gradient(to right, #93291e, #ed213a);
    background: linear-gradient(to right, #93291e, #ed213a);
    border-radius: 8px;
    width: ${width ?? '20%'};
    height: 100%;
    padding: 0 16px;
  `}
`;

const getAndSetUserInfo = async (
  setter: Dispatch<SetStateAction<IExtraLifeUser | null>>
) => {
  const response = await getUserInfo(PARTICIPANT_ID);
  console.log('Fetching UserInfo');
  setter(response);
};

export const DonationGoal = () => {
  const [userInfo, setUserInfo] = useState<IExtraLifeUser | null>(null);

  useEffect(() => {
    // run once, then set interval
    if (userInfo === null) {
      void getAndSetUserInfo(setUserInfo);
    }

    const interval = setInterval(() => {
      void getAndSetUserInfo(setUserInfo);
    }, API_POLLING_MS);

    return () => clearInterval(interval);
  }, []);

  const donationGoal = userInfo?.fundraisingGoal ?? 1000;
  const currentDonations = userInfo?.sumDonations ?? 0;
  const percentageComplete = `${(currentDonations / donationGoal) * 100}%`;

  return (
    <Card title="Extra-Life Donation Goal!">
      <GoalContainer>
        <Meter width={percentageComplete} />
        <Amounts>
          <span>{formatCurrency(currentDonations)}</span>
          <span>{formatCurrency(donationGoal)}</span>
        </Amounts>
      </GoalContainer>
    </Card>
  );
};
