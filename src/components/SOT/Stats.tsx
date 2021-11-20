import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../Card';
import { getStats } from '../../utils/supabase';
import dayjs from '../../utils/dayjs';
import { API_POLLING_MS, END_TIME, START_TIME } from '../../utils/constants';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  & li {
    margin-left: 12px;
    font-size: 28px;

    & strong {
      font-size: 24px;
    }
  }
`;

export type Stats = {
  shipsSunk: number;
  reapersSunk: number;
  timesSunk: number;
  goldAccumulated: number;
  fortsCompleted: number;
  toxicPlayersReported: number;
  toxicPlayersBanned: number;
  flagsSold: number;
};

const defaultStats = {
  shipsSunk: 0,
  reapersSunk: 0,
  timesSunk: 0,
  goldAccumulated: 0,
  fortsCompleted: 0,
  toxicPlayersReported: 0,
  toxicPlayersBanned: 0,
  flagsSold: 0,
};

export const Stats = () => {
  const [stats, setStats] = useState<Stats>(defaultStats);

  useEffect(() => {
    // run once, then set interval
    void getStats(setStats);

    const interval = setInterval(() => {
      console.log('Updating stats');
      getStats(setStats);
    }, API_POLLING_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card variant="blue" title="Stream Stats" hideSkew>
      <List>
        <li>
          🏁 <strong>Flags Sold:</strong> {stats.flagsSold.toLocaleString()}
        </li>
        <li>
          ⛴ <strong>Ships Sunk:</strong> {stats.shipsSunk.toLocaleString()}
        </li>
        <li>
          👹 <strong>Reapers Sunk:</strong> {stats.reapersSunk.toLocaleString()}
        </li>
        <li>
          ☠️ <strong>Times We Sunk:</strong> {stats.timesSunk.toLocaleString()}
        </li>
        <li>
          🤑 <strong>Gold Profit:</strong>{' '}
          {stats.goldAccumulated.toLocaleString()}
        </li>
        <li>
          🏰 <strong>Forts Completed:</strong>{' '}
          {stats.fortsCompleted.toLocaleString()}
        </li>
        {/* <li>
          💥 <strong>Toxic Players Banned:</strong>{' '}
          {stats.toxicPlayersBanned.toLocaleString()}
        </li> */}
      </List>
    </Card>
  );
};
