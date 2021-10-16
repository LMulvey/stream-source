import React, { useEffect, useState } from 'react';
import { getParticipantDonations } from 'extra-life';
import { PARTICIPANT_ID } from '../utils/constants';

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

  return <h2>donation</h2>;
};
