import { createSlice } from "@reduxjs/toolkit";
import { ObjectContentType } from "../utils/types.ts";

const inProgressSlice = createSlice({
    name: "inProgress",
    initialState: <ObjectContentType[]>[],
    reducers: {
        addInProgressTodo: (state, action) => {
            state.push(action.payload);
            state.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
        },
        removeInProgressTodo: (state, action) => {
            const todoPosition = state.findIndex((todo) => todo.id === action.payload);
            state.splice(todoPosition, 1);
        },
        addInProgressLocalStorageTodos: (
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

export const { addInProgressTodo, removeInProgressTodo, addInProgressLocalStorageTodos } =
    inProgressSlice.actions;

export default inProgressSlice.reducer;
