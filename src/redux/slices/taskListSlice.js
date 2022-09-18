import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    tasks: [],
};

const taskListSlice = createSlice({
    name: 'tasklist',
    initialState,
    reducers: {
        addTask: (state, action) => {
            return { ...state, tasks: [...state.tasks, action.payload] }
        },
        editTask: (state, action) => {
            const { index, updatedTask } = action.payload;

            return { ...state, tasks: [...state.tasks.slice(0, index), updatedTask, ...state.tasks.slice(index + 1, state.tasks.length)] }
        },
        deleteTask: (state, action) => {
            return { ...state, tasks: state.tasks.filter((element, i) => i !== action.payload) }
        },
        deleteAllTasks: (state) => {
            return { ...state, tasks: [] }
        }
    }
});

export const { addTask, editTask, deleteTask, deleteAllTasks } = taskListSlice.actions;
export default taskListSlice.reducer;