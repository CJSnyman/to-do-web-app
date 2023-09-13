import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import unstartedTodoReducer from "./unstartedTodoSlice.ts";
import inProgressTodoReducer from "./inProgressTodoSlice.ts";
import completedTodoReducer from "./completedTodoSlice.ts";

const store = configureStore({
    reducer: {
        unstartedToDo: unstartedTodoReducer,
        inProgressToDo: inProgressTodoReducer,
        completedToDo: completedTodoReducer,
    },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
