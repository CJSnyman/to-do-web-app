import { createSlice } from "@reduxjs/toolkit";
import { ObjectContentType } from "../utils/types";

const unstartedSlice = createSlice({
    name: "unstarted",
    initialState: <ObjectContentType[]>[],
    reducers: {
        addNewTodo: (state, action) => {
            state.push(action.payload);
            state.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
        },
        removeNewTodo: (state, action) => {
            const todoPosition = state.findIndex((todo) => todo.id === action.payload);
            state.splice(todoPosition, 1);
        },
        addNewLocalStorageTodos: (
            state,
            action: {
                payload: ObjectContentType[];
                type: string;
            }
        ) => {
            state.length = 0;
            action.payload.map((todo) => {
                state.push(todo);
            });
        },
    },
});

export const { addNewTodo, removeNewTodo, addNewLocalStorageTodos } = unstartedSlice.actions;

export default unstartedSlice.reducer;
