import { createSlice } from "@reduxjs/toolkit";
import { ObjectContentType } from "../utils/types.ts";

const completedSlice = createSlice({
    name: "completed",
    initialState: <ObjectContentType[]>[],
    reducers: {
        addCompletedTodo: (state, action) => {
            state.push(action.payload);
            state.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
        },
        removeCompletedTodo: (state, action) => {
            const todoPosition = state.findIndex((todo) => todo.id === action.payload);
            state.splice(todoPosition, 1);
        },
        addCompletedLocalStorageTodos: (
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

export const { addCompletedTodo, removeCompletedTodo, addCompletedLocalStorageTodos } =
    completedSlice.actions;

export default completedSlice.reducer;
