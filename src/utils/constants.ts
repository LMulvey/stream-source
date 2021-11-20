import dayjs from './dayjs';

export const PARTICIPANT_ID = 465108;
export const API_POLLING_MS = 30_000;
export const EL_API_POLLING_MS = 200_000;
export const START_TIME = dayjs('2021-11-19 21:00:00');
export const END_TIME = START_TIME.add(dayjs.duration({ hours: 24 }));
export const INITIAL_TIME_REMAINING = dayjs.preciseDiff(
  START_TIME,
  END_TIME,
  true
);
