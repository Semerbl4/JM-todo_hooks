import { React, useState } from 'react';

import './App.css';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

const App = () => {
  // state = {
  //   serverInfo: [],
  //   currentFilter: 'All',
  // };

  const [serverInfo, setServerInfo] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('All');

  const uncompletedTasks = () => {
    let tasksRemain = 0;

    serverInfo.forEach((el) => {
      if (el.completed === false) {
        tasksRemain += 1;
      }
    });
    return tasksRemain;
  };

  const clearCompleted = () => {
    const newServerInfo = serverInfo.filter((el) => el.completed === false);

    setServerInfo(newServerInfo);
  };

  const changeFilter = (filterName) => {
    // console.log(filterName);
    setCurrentFilter(filterName);
    // console.log(this.state);
  };

  const addTask = (taskText, min, sec) => {
    const newServerInfo = [...serverInfo];

    newServerInfo.push({
      id: Math.random(),
      completed: false,
      taskText,
      taskCreateTime: new Date(),
      minutes: min,
      seconds: sec,
    });

    setServerInfo(newServerInfo);
  };

  const completeChanged = (id) => {
    const servInf = [...serverInfo];

    const newServerInfo = servInf.map((el) => {
      const element = el;
      if (el.id === id) {
        element.completed = !element.completed;
      }
      return element;
    });
    // console.log("меняем на completed");
    // console.log(newServerInfo);

    setServerInfo(newServerInfo);
  };

  const taskDestroyed = (id) => {
    const servInf = [...serverInfo];

    const newServerInfo = servInf.filter((el) => el.id !== id);

    setServerInfo(newServerInfo);
  };

  const setNewTime = (id, minutes, seconds) => {
    const newServerInfo = serverInfo.reduce((acc, elem) => {
      if (elem.id === id) {
        // eslint-disable-next-line no-param-reassign
        elem.minutes = minutes;
        // eslint-disable-next-line no-param-reassign
        elem.seconds = seconds;
        acc.push(elem);
        return acc;
      }
      acc.push(elem);
      return acc;
    }, []);

    setServerInfo(newServerInfo);
  };

  return (
    <section className="todoapp">
      <NewTaskForm addTask={addTask} />
      <TaskList
        todoData={serverInfo}
        completeChanged={completeChanged}
        taskDestroyed={taskDestroyed}
        currentFilter={currentFilter}
        setNewTime={setNewTime}
      />
      <Footer changeFilter={changeFilter} clearCompleted={clearCompleted} uncompletedTasks={uncompletedTasks} />
    </section>
  );
};

export default App;
