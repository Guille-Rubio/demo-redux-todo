import React, { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import ToDoCard from '../ToDoCard/ToDoCard';
import { addTask, deleteTask, deleteAllTasks } from '../../../redux/slices/taskListSlice';



const ToDoList = () => {
  const taskList = useSelector((state) => state.taskList.tasks);
  const dispatch = useDispatch();
  const newTaskInput = useRef(null);

  const addItem = (event) => {
    event.preventDefault();
    dispatch(addTask(newTaskInput.current.value));
    newTaskInput.current.value = "";
  };

  const deleteCard = (i) => { dispatch(deleteTask(i)) };
  const deleteAllCards = () => { dispatch(deleteAllTasks()) };
  const printCards = () => taskList.map((task, i) => <ToDoCard key={uuidv4()} data={task} delete={() => deleteCard(i)} index={i} />);


  return <section className="todolist">
    <h2>To do list</h2>
    <form className="todolist__form">
      <input type="text" ref={newTaskInput} placeholder="Add a new task"></input>
      <button className="button1" type="submit" onClick={addItem}>Add to list</button>
    </form>
    <section className="todolist__container">
      {taskList.length > 0 ? <h3>Task List</h3> : ""}
      {printCards()}
    </section>
    {taskList.length > 1 ? <button className="button1" onClick={deleteAllCards}>Delete List</button> : ""}

  </section>;
};

export default ToDoList;
