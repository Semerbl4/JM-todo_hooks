import { React, useState } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

const NewTaskForm = ({ addTask }) => {
  const [value, setValue] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const setValidStates = (event) => {
    if (event.target.name === 'task') {
      setValue(event.target.value);
      // console.dir('task', minutes, seconds)
    }

    if (event.target.name === 'minutes' && !Number.isNaN(+event.target.value)) {
      setMinutes(+event.target.value);
    }

    if (event.target.name === 'seconds' && !Number.isNaN(+event.target.value) && +event.target.value <= 60) {
      setSeconds(+event.target.value);
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form
        className="new-todo-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (!value) {
            return;
          }
          addTask(value, minutes, seconds);

          setValue('');
          setMinutes('');
          setSeconds('');
        }}
      >
        <input
          className="new-todo"
          name="task"
          tabIndex={0}
          placeholder="What needs to be done?"
          value={value}
          onChange={setValidStates}
        />
        <input
          className="new-todo-form__timer"
          name="minutes"
          value={minutes}
          placeholder="Min"
          onChange={setValidStates}
        />
        <input
          className="new-todo-form__timer"
          name="seconds"
          value={seconds}
          placeholder="Sec"
          onChange={setValidStates}
        />
        <button type="submit" aria-label="отправить" />
      </form>
    </header>
  );
};

NewTaskForm.defaultProps = {
  addTask: () => {},
};

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
};

export default NewTaskForm;
