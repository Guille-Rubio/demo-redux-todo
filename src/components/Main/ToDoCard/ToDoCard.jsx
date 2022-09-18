import React, { useState } from "react";
import Draggable from "react-draggable";
import { useSelector, useDispatch } from 'react-redux'
import { editTask, toggleTaskCompleted } from "../../../redux/slices/taskListSlice";


const ToDoCard = (props) => {
  const dispatch = useDispatch();
  const taskText = useSelector((state) => state.taskList.tasks[props.index].title);
  const completed = useSelector((state)=> state.taskList.tasks[props.index].completed);

  const [taskInput, setTaskInput] = useState(taskText);

  const updateTask = (event) => {
    event.preventDefault();
    setTaskInput(event.target.value);
  };

  const toggleCompletion = (event) => {
    event.preventDefault();
    const status = event.target.checked;
    dispatch(toggleTaskCompleted({ index: props.index, status: status }))
  };

  return <Draggable deltaY="10" grid={[50, 50]} scale={1} axis='y'>
    <article className="todocard__card">
      <input type="checkbox" defaultChecked={completed} onClick={toggleCompletion} />
      <input type="text" value={taskInput} onChange={updateTask} onBlur={() => dispatch(editTask({ index: props.index, updatedTask: taskInput }))}></input>
      <button className="button1" onClick={props.delete}>X</button>
    </article>
  </Draggable >;
};

export default ToDoCard;
