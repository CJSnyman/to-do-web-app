import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

import { ObjectContentType } from "../utils/types";

import { useAppDispatch } from "../store/store";
import { addNewTodo } from "../store/unstartedTodoSlice";

export const AddNewToDo = ({
    setShowAddFormBoolean,
}: {
    setShowAddFormBoolean: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [addTimeBoolean, setAddTimeBoolean] = useState(false);
    const dispatch = useAppDispatch();

    const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let date = new Date(e.currentTarget["date"].value);
        if (addTimeBoolean)
            date = new Date(`${e.currentTarget["date"].value} ${e.currentTarget["time"].value}`);
        const newTodo: ObjectContentType = {
            title: e.currentTarget["todoName"].value,
            more: e.currentTarget["more"].value,
            progress: "Not started",
            date: date.toString(),
            id: nanoid(),
        };

        setShowAddFormBoolean(false);
        dispatch(addNewTodo(newTodo));
    };

    const today = new Date().toISOString().split("T")[0];
    const now = new Date().toTimeString().slice(0, 5);

    return (
        <form onSubmit={handleClick}>
            <section>
                <label htmlFor="todoName">Title: </label>
                <br />
                <input type="text" name="todoName" id="todoName" required />
            </section>
            <section>
                <label htmlFor="more">More: </label>
                <br />
                <textarea name="more" id="more" cols={30} rows={4} autoCapitalize="true"></textarea>
            </section>
            <section>
                <label htmlFor="date">Set Date: </label>
                <br />
                <input
                    type="date"
                    name="date"
                    id="date"
                    defaultValue={today}
                    min={today}
                    required
                />
            </section>
            <section>
                <input
                    type="checkbox"
                    name="addTime"
                    id="addTime"
                    onChange={(e) => setAddTimeBoolean(e.target.checked)}
                />
                <label htmlFor="addTime">Add time </label>
                <br />
                <input
                    className="time"
                    type="time"
                    name="time"
                    id="time"
                    defaultValue={now}
                    disabled={!addTimeBoolean}
                />
            </section>
            <section className="form-buttons">
                <button className="addTodo form-addTodo" type="submit">
                    +
                </button>
                <button
                    className="form-cancel"
                    type="button"
                    onClick={() => setShowAddFormBoolean(false)}
                >
                    Cancel
                </button>
            </section>
        </form>
    );
};
