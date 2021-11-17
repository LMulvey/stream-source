import React, { useEffect, useState } from 'react';
import { INITIAL_TIME_REMAINING, END_TIME } from '../utils/constants';
import dayjs from '../utils/dayjs';
import { Card } from './Card';

// This will be replaced by a DB entry

export const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME_REMAINING);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(dayjs.preciseDiff(dayjs(), END_TIME, true));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const buildTime = (
    path: 'hours' | 'days' | 'minutes' | 'seconds' | 'years',
    comma = true
  ) => ({
    [path]: (
      <>
        {timeRemaining[path] !== null && timeRemaining[path] !== undefined
          ? `${timeRemaining[path]} ${path}${comma ? `, ` : ''}`
          : ''}
      </>
    ),
  });

  const time = {
    ...buildTime('days'),
    ...buildTime('hours'),
    ...buildTime('minutes'),
    ...buildTime('seconds', false),
  };

  return (
    <Card variant="green" title="Stream Time Remaining" hideSkew>
      {time.days}
      {time.hours}
      {time.minutes}
      {time.seconds}
    </Card>
  );
};
