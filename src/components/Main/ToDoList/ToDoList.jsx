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

  const defaultList = taskList;
  const [itemList, setItemList] = useState(defaultList);

  const addItem = (event) => {
    event.preventDefault();
    dispatch(addTask(newTaskInput.current.value));
    newTaskInput.current.value = "";
  };

  const deleteCard = (i) => { dispatch(deleteTask(i)) };
  const deleteAllCards = () => { dispatch(deleteAllTasks()) };
  const printCards = () => taskList.map((task, i) => <ToDoCard>
    <Draggable
      draggableId={item}
      key={uuidv4()}
      index={i}
      data={task}
      delete={() => deleteCard(i)} />
  </ToDoCard>);


  const handleDrop = (droppedItem) => {
    if (!droppedItem.destination) return;
    const updatedList = [...itemList];
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    setItemList(updatedList);
  }



  return <section className="todolist">
    <h2>To do list</h2>
    <form className="todolist__form">
      <input type="text" ref={newTaskInput} placeholder="Add a new task"></input>
      <button className="button1" type="submit" onClick={addItem}>Add to list</button>
    </form>
    {taskList.length > 0 ? <h3>Task List</h3> : ""}
    <section id="list" className="todolist__container">
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container">
          {printCards()}
          {/*     {(provided) => (
            <div
              className="list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >


            </div>
          )} */}
        </Droppable>

      </DragDropContext>
    </section>
    {taskList.length > 1 ? <button className="button1" onClick={deleteAllCards}>Delete List</button> : ""}

  </section>;
};

export default ToDoList;
