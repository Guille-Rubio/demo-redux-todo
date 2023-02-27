## To Do List with Redux - Workshop

You'll learn to: 

1. Install dependencies
2. Structure Files
3. Create Store
4. Provide Store
5. Add reducer slice
6. Use redux in your view/component


## Install dependencies

`npm install react-redux @reduxjs/toolkit`

## Create a redux folder with the following structure
```
Redux
    ├──slices
    │  ├──taskListSlice.js
    │  └──...other slices
    └──store.js
```


## Create Store
 Contains the state of the app and the reducers divided in slices. Single source of truth principle. 

 ```
//store.js
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore() 
```

## Provide Store

In your src/index.js, import react-redux and provide the store

```
//src/index.js
//... other imports
import { store } from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
      <App />
   </Provider> 
);

//...

```

## Add reducers slice
In taskListSlice.js, pass the following arguments to createSlice: 
1. Give a name to your slice.
2. Initialize your state.
3. Write your reducers (think about the reducers that your app will use, i.e. add task, delete task, edit task, etc.).
    Remember immutability when writting your reducers.
    Each reducer always takes the previous state as first argument and the action optionally as the second.

```
//src/redux/slices/taskListSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
};

const taskListSlice = createSlice({
    name: 'tasklist',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const newTask = {
                date: new Date().toJSON(),
                title: action.payload,
                completed: false,
                position: state.tasks.length + 1
            };

            return { ...state, tasks: [...state.tasks, newTask] }
        },
        //Other reducers
        //...
    }
});

//Export the actions to be dispatched fron the views
export const { addTask /*, other reducers* */} = taskListSlice.actions;
//Export the reducer to be imported in the Store
export default taskListSlice.reducer;

```

[Named Export vs Default Export in ES6](https://medium.com/@etherealm/named-export-vs-default-export-in-es6-affb483a0910)

In your store.js, add your slice, it shoud look like this
```
//src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import taskListSlice from './slices/taskListSlice';

export const store = configureStore({
    reducer:{
        taskList:taskListSlice
        //... Other slices
    }
}); 

```

## Add redux to your view

Your view/component will need to: 
- Read your redux state (subscribe)
- Change your redux state (dispatch)

### Subscribe

```
import { useSelector } from 'react-redux';

const ToDoList = () => {

  const taskList = useSelector((state) => state.taskList.tasks);

  return <section>
  
  //print cards using taskList.map
  
  </section>
  
```

### Dispatch

In your components, import the dispatcher and the actions
```
import { useDispatch } from 'react-redux';
import { addTask } from '../../../redux/slices/taskListSlice';
```
In your function component

```
const ToDoList =()=>{
    const dispatch = useDispatch();

//event handler
    const addItem = (event) => {
    event.preventDefault();
    dispatch(addTask(newTaskInput.current.value));
  };

  return <section>
    //...
    <button onClick={addItem}>Add Item</button>
    //...
  </section>
};
```

In your event handler, dispatch your reducer with your action. To dispatch the action you only need to pass the payload as argument.




