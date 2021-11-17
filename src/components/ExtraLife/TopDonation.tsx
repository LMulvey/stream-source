import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getUserDonations } from 'extra-life-api';
import { EL_API_POLLING_MS, PARTICIPANT_ID } from '../../utils/constants';
import { Card } from '../Card';
import type { IExtraLifeDonation } from 'extra-life-api/dist/helpers/interfaces';

const sortDonationsByAmount = (donations: IExtraLifeDonation[] = []) =>
  [...donations].sort(
    (a: IExtraLifeDonation, b: IExtraLifeDonation) => b.amount - a.amount
  );

const getDonations = async (
  setTopDonation: Dispatch<SetStateAction<IExtraLifeDonation | null>>
) => {
  const response = await getUserDonations(PARTICIPANT_ID);
  const donations = response.donations;
  const sortedDonations = sortDonationsByAmount(donations);
  const topDonation = sortedDonations.length ? sortedDonations[0] : null;
  console.log('Fetching the top donation');
  setTopDonation(topDonation);
};

export const TopDonation = () => {
  const [topDonation, setTopDonation] = useState<IExtraLifeDonation | null>(
    null
  );

  useEffect(() => {
    // run once, then set interval
    if (topDonation === null) {
      void getDonations(setTopDonation);
    }

    const interval = setInterval(() => {
      void getDonations(setTopDonation);
    }, EL_API_POLLING_MS);

    return () => clearInterval(interval);
  }, []);

  const value = topDonation
    ? `$${topDonation.amount} from ${topDonation.displayName ?? 'Anonymous'}`
    : 'N/A';

  return <Card variant="green" title="Top Donation" value={value} />;
};
