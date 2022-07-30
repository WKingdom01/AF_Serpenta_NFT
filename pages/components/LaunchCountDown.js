import React, { useEffect, useMemo, useState } from 'react';

const LaunchCountDown = ({
  days,
  hours,
  minutes,
  seconds,
  countDownPrefix,
}) => {
  const [time, setTime] = useState(
    days * 24 * 3600 + hours * 3600 + minutes * 60 + seconds
  );

  const remainTime = useMemo(() => {
    const days = Math.floor(time / 24 / 3600);
    const hours = Math.floor((time - days * 24 * 3600) / 3600);
    const minutes = Math.floor((time - days * 24 * 3600 - hours * 3600) / 60);
    const seconds = (time - days * 24 * 3600 - hours * 3600) % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => (time !== 0 ? time - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span>
      {' '}
      {countDownPrefix}: {remainTime.days}d {remainTime.hours}h{' '}
      {remainTime.minutes}m {remainTime.seconds}s
    </span>
  );
};

export default LaunchCountDown;
