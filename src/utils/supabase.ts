import { createClient } from '@supabase/supabase-js';
import { Dispatch, SetStateAction } from 'react';
import { Stats } from '../components/SOT';
import { END_TIME, START_TIME } from './constants';
import dayjs from './dayjs';

export const supabase = createClient(
  'https://rhxvllttfoukyymogyiw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNzE3MjA1MiwiZXhwIjoxOTUyNzQ4MDUyfQ.LAf1i8nTALSKVOElIbhnCSunw8IHMBIQHk4672Ss44A'
);

type SetStatsType = Dispatch<SetStateAction<Stats>>;

export async function getGoldProfit(setStats: SetStatsType) {
  const { data, error } = await supabase.from('gold').select('*');

  if (!error) {
    const filteredGold = data
      ? data.filter((gold) =>
          dayjs(gold.created_at).isBetween(START_TIME, END_TIME)
        )
      : [];

    const goldProfit =
      filteredGold[filteredGold.length - 1].current_gold -
      filteredGold[0].current_gold;

    setStats((c) => ({ ...c, goldAccumulated: goldProfit }));
  }
}

export async function getShipsSunk(setStats: SetStatsType) {
  const { data, error } = await supabase.from('ships_sunk').select('*');

  if (!error) {
    const filteredData = data
      ? data.filter((item) =>
          dayjs(item.created_at).isBetween(START_TIME, END_TIME)
        )
      : [];

    const results = filteredData.length;

    setStats((c) => ({ ...c, shipsSunk: results }));
  }
}

export async function getTimesSunk(setStats: SetStatsType) {
  const { data, error } = await supabase.from('times_sunk').select('*');

  if (!error) {
    const filteredData = data
      ? data.filter((item) =>
          dayjs(item.created_at).isBetween(START_TIME, END_TIME)
        )
      : [];

    const results = filteredData.length;

    setStats((c) => ({ ...c, timesSunk: results }));
  }
}

export async function getFortsCompleted(setStats: SetStatsType) {
  const { data, error } = await supabase.from('events_completed').select('*');

  if (!error) {
    const filteredData = data
      ? data.filter(
          (item) =>
            dayjs(item.created_at).isBetween(START_TIME, END_TIME) &&
            [1, 3, 5].includes(item.event_type)
        )
      : [];

    const results = filteredData.length;

    setStats((c) => ({ ...c, fortsCompleted: results }));
  }
}

export async function getPlayersBanned(setStats: SetStatsType) {
  const { data, error } = await supabase.from('players_banned').select('*');

  if (!error) {
    const filteredData = data
      ? data.filter((item) =>
          dayjs(item.created_at).isBetween(START_TIME, END_TIME)
        )
      : [];

    const results = filteredData.length;

    setStats((c) => ({ ...c, toxicPlayersBanned: results }));
  }
}

export async function getReapersSunk(setStats: SetStatsType) {
  const { data, error } = await supabase
    .from('ships_sunk')
    .select('*')
    .eq('enemy_emissary', 1);

  if (!error) {
    const filteredData = data
      ? data.filter((item) =>
          dayjs(item.created_at).isBetween(START_TIME, END_TIME)
        )
      : [];

    const results = filteredData.length;

    setStats((c) => ({ ...c, reapersSunk: results }));
  }
}

export async function getFlagsSold(setStats: SetStatsType) {
  const { data, error } = await supabase.from('flags_sold').select('*');

  if (!error) {
    const filteredData = data
      ? data.filter((item) =>
          dayjs(item.created_at).isBetween(START_TIME, END_TIME)
        )
      : [];

    const results = filteredData.length;
    setStats((c) => ({ ...c, flagsSold: results }));
  }
}

export async function getStats(setStats: SetStatsType) {
  await Promise.all([
    getGoldProfit(setStats),
    getShipsSunk(setStats),
    getReapersSunk(setStats),
    getTimesSunk(setStats),
    getFortsCompleted(setStats),
    getPlayersBanned(setStats),
  ]);
}
