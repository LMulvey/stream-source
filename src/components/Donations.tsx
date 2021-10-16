import React, { useEffect, useState } from 'react';
import { getParticipantDonations } from 'extra-life';
import { PARTICIPANT_ID } from '../utils/constants';
import { Card } from './Card';

const getDonations = () => {
  return getParticipantDonations(PARTICIPANT_ID);
};

export const Donations = () => {
  const [donations, setDonations] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getDonations();
      setDonations(response);
    })();
  }, []);

  console.log({ donations });

  return <Card title="Most recent donation" value="$25" />;
};
