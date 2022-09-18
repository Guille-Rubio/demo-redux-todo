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
                completed: false
            };
            return { ...state, tasks: [...state.tasks, newTask] }
        },
        editTask: (state, action) => {
            const { index, updatedTask } = action.payload;
            return { ...state, tasks: [...state.tasks.slice(0, index), { ...state.tasks[index], title: updatedTask }, ...state.tasks.slice(index + 1, state.tasks.length)] }
        },
        deleteTask: (state, action) => {
            return { ...state, tasks: state.tasks.filter((element, i) => i !== action.payload) }
        },
        deleteAllTasks: (state) => {
            return { ...state, tasks: [] }
        },
        toggleTaskCompleted: (state, action) => {
            const { index, status } = action.payload;
            return { ...state, tasks: [...state.tasks.slice(0, index), { ...state.tasks[index], completed: status }, ...state.tasks.slice(index + 1, state.tasks.length)] }
        },

    }
});

export const { addTask, editTask, deleteTask, deleteAllTasks, toggleTaskCompleted } = taskListSlice.actions;
export default taskListSlice.reducer;