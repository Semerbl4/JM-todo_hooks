import { React, useState, useEffect } from 'react';
// import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './Task.css';

import Timer from '../Timer/Timer';

const Task = ({
  minutes,
  seconds,
  completeChanged,
  id,
  taskDestroyed,
  completed,
  taskText,
  taskCreateTime,
  className,
  setNewTime,
}) => {
  const [timerIsStoped, setTimerIsStoped] = useState(true);

  const setStoppedFalse = () => {
    // console.log('false')
    setTimerIsStoped(false);
  };

  const setStoppedTrue = () => {
    // console.log('false')
    setTimerIsStoped(true);
  };

  const startTimer = () => {
    // console.log('интервалит')

    let sec;
    let min;

    if (minutes) {
      min = minutes;
      sec = seconds - 1;
      if (sec === -1) {
        sec = 59;
        min -= min - 1;
      }
    } else if (seconds) {
      sec = seconds - 1;
    }

    setNewTime(id, min, sec);
  };

  const completeToogler = () => {
    completeChanged(id);
  };

  const currentTaskDestroyed = () => {
    taskDestroyed(id);
  };

  useEffect(() => {
    let timeoutId;
    if (!timerIsStoped) {
      timeoutId = setTimeout(() => {
        startTimer();
      }, 1000);
    } else clearTimeout(timeoutId);

    return () => clearTimeout(timeoutId);
  });

  return (
    <li className={completed ? 'completed' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={completeToogler} defaultChecked={completed} />
        <label>
          <span className="title">{taskText}</span>
          {minutes || seconds ? (
            <Timer
              minutes={minutes}
              seconds={seconds}
              setStoppedFalse={setStoppedFalse}
              setStoppedTrue={setStoppedTrue}
            />
          ) : null}
          <span className="created">created {formatDistanceToNow(taskCreateTime, { includeSeconds: true })} ago</span>
        </label>
        <button className="icon icon-edit" type="button" aria-label="Редактировать" />
        <button className="icon icon-destroy" onClick={currentTaskDestroyed} type="button" aria-label="Удалить" />
      </div>
      {className === 'editing' ? <input type="text" className="edit" defaultValue="Editing task" /> : null}
    </li>
  );
};

Task.defaultProps = {
  completed: false,
  taskText: '',
  minutes: '',
  seconds: '',
  taskCreateTime: new Date(),
  id: Math.random(),
  completeChanged: () => {},
  taskDestroyed: () => {},
  className: '',
};

Task.propTypes = {
  completed: PropTypes.bool,
  taskText: PropTypes.string,
  minutes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  seconds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  taskCreateTime: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.number,
  completeChanged: PropTypes.func,
  taskDestroyed: PropTypes.func,
  className: PropTypes.string,
  setNewTime: PropTypes.func.isRequired,
};

export default Task;
