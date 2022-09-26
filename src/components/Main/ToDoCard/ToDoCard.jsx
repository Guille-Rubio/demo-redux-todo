import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { useSelector, useDispatch } from 'react-redux'
import { editTask, toggleTaskCompleted } from "../../../redux/slices/taskListSlice";
import dragIcon from '../../../assets/icons/drag.png';


const ToDoCard = (props) => {
  const dispatch = useDispatch();
  const taskText = useSelector((state) => state.taskList.tasks[props.index].title);
  const completed = useSelector((state) => state.taskList.tasks[props.index].completed);

  const [cardStyle, setCardStyle] = useState("");
  const [taskInput, setTaskInput] = useState(taskText);

  const nodeRef = useRef(null);

  const updateTask = (event) => {
    event.preventDefault();
    setTaskInput(event.target.value);
  };

  const toggleCompletion = (event) => {
    event.preventDefault();
    const status = event.target.checked;
    dispatch(toggleTaskCompleted({ index: props.index, status: status }))
  };


  return <article ref={nodeRef} className={`todocard${completed ? "__completed" : ""}${cardStyle}`}>
    <div className="todocard__element" ><img src={dragIcon} alt="drag icon" className="todocard__drag-icon" /></div>
    <input type="checkbox" defaultChecked={completed} onClick={toggleCompletion} />
    <input type="text" value={taskInput} onChange={updateTask} onBlur={() => dispatch(editTask({ index: props.index, updatedTask: taskInput }))}></input>
    <button className="button1" onClick={props.delete}>X</button>
  </article>

};



export default ToDoCard;
