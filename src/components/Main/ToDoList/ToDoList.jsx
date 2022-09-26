import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import ToDoCard from '../ToDoCard/ToDoCard';
import { addTask, deleteTask, deleteAllTasks } from '../../../redux/slices/taskListSlice';


const ToDoList = () => {

  const taskList = useSelector((state) => state.taskList.tasks);
  const dispatch = useDispatch();
  const newTaskInput = useRef(null);

  /* const defaultList = taskList;
  const [itemList, setItemList] = useState(defaultList); */

  const addItem = (event) => {
    event.preventDefault();
    dispatch(addTask(newTaskInput.current.value));
    newTaskInput.current.value = "";
  };

  const deleteCard = (i) => { dispatch(deleteTask(i)) };
  const deleteAllCards = () => { dispatch(deleteAllTasks()) };
  const printCards = () => taskList.map((task, i) => <ToDoCard key={uuidv4()} data={task} index={i} delete={() => deleteCard(i)} />);


  return <section className="todolist">
    <h2>To do list</h2>
    <form className="todolist__form">
      <input type="text" ref={newTaskInput} placeholder="Add a new task"></input>
      <button className="button1" type="submit" onClick={addItem}>Add to list</button>
    </form>
    {taskList.length > 0 ? <h3>Task List</h3> : ""}
    <section id="list" className="todolist__container">
     
          {printCards()}
         
     
    </section>
    {taskList.length > 1 ? <button className="button1" onClick={deleteAllCards}>Delete List</button> : ""}

  </section>;
};

export default ToDoList;
