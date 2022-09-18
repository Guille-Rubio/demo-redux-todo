import React, { useState } from "react";
import Draggable from "react-draggable";
import { useSelector, useDispatch } from 'react-redux'
import { editTask } from "../../../redux/slices/taskListSlice";


const ToDoCard = (props) => {
  const dispatch = useDispatch();
  const taskText = useSelector((state) => state.taskList.tasks[props.index])

  const [taskInput, setTaskInput] = useState(taskText);

  const updateTask = (event) => {
    event.preventDefault();
    setTaskInput(event.target.value);
  };

  return <Draggable deltaY="10" grid={[50, 50]} scale={1} axis='y'>
    <article className="todocard__card">
      <input type="checkbox" />
      <input type="text" value={taskInput} onChange={updateTask} onBlur={() => dispatch(editTask({ index: props.index, updatedTask: taskInput }))}></input>
      <button className="button1" onClick={props.delete}>X</button>

    </article>
  </Draggable >;
};

export default ToDoCard;
