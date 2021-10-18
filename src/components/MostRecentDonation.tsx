import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getUserDonations } from 'extra-life-api';
import { API_POLLING_MS, PARTICIPANT_ID } from '../utils/constants';
import { Card } from './Card';
import type { IExtraLifeDonation } from 'extra-life-api/dist/helpers/interfaces';

const getDonations = async (
  setMostRecentDonation: Dispatch<SetStateAction<IExtraLifeDonation | null>>
) => {
  const response = await getUserDonations(PARTICIPANT_ID);
  const donations = response.donations;
  const mostRecent = donations.length ? donations[0] : null;
  console.log('Fetching most recent donation');
  setMostRecentDonation(mostRecent);
};

export const MostRecentDonation = () => {
  const [mostRecentDonation, setMostRecentDonation] =
    useState<IExtraLifeDonation | null>(null);

  useEffect(() => {
    // run once, then set interval
    if (mostRecentDonation === null) {
      void getDonations(setMostRecentDonation);
    }

    const interval = setInterval(() => {
      void getDonations(setMostRecentDonation);
    }, API_POLLING_MS);

    return () => clearInterval(interval);
  }, []);

  const value = mostRecentDonation
    ? `$${mostRecentDonation.amount} from ${
        mostRecentDonation.displayName ?? 'Anonymous'
      }`
    : 'N/A';

  return <Card title="Most recent donation" value={value} />;
};
