const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

/**
 * @param time {Date}
 * @returns {{hours: number, seconds: number, minutes: number, days: number}}
 */
export const getCountdownVariables = (time) => {
  const current = new Date();
  const distance = time - current;

  const days = Math.floor(distance / DAY);
  const hours = Math.floor((distance % DAY) / HOUR);
  const minutes = Math.floor((distance % HOUR) / MINUTE);
  const seconds = Math.floor((distance % MINUTE) / SECOND);
  return { days, hours, minutes, seconds };
};
