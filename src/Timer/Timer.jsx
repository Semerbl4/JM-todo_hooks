import React from 'react';
import PropTypes from 'prop-types';

const Timer = (props) => {
  const { minutes } = props;
  const { seconds } = props;
  const { setStoppedTrue } = props;
  const { setStoppedFalse } = props;

  // const intervalStartTimer = setInterval(() => {
  //   startTimer()
  // }, 1000);

  return (
    <span className="description">
      <button className="icon icon-play" aria-label="запустить" type="button" onClick={setStoppedFalse} />
      <button className="icon icon-pause" aria-label="остановить" type="button" onClick={setStoppedTrue} />
      <span className="timer-time">{`${minutes}:${seconds}`}</span>
    </span>
  );
};

Timer.defaultProps = {
  minutes: '00',
  seconds: '00',
  setStoppedTrue: () => {},
  setStoppedFalse: () => {},
};

Timer.propTypes = {
  minutes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  seconds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setStoppedTrue: PropTypes.func,
  setStoppedFalse: PropTypes.func,
};

export default Timer;
