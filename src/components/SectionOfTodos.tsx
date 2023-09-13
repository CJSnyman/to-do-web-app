import { useAppDispatch } from "../store/store";
import { removeNewTodo } from "../store/unstartedTodoSlice";
import { addInProgressTodo, removeInProgressTodo } from "../store/inProgressTodoSlice";
import { addCompletedTodo, removeCompletedTodo } from "../store/completedTodoSlice";
import { ObjectContentType } from "../utils/types";
import { getColor } from "../utils/getColor";

export const SectionOfToDos = ({
    data,
    theme,
}: {
    data: ObjectContentType[];
    theme: "dark" | "light";
}) => {
    const dispatch = useAppDispatch();

    const progressMade = ({ date, title, progress, id, more }: ObjectContentType) => {
        if (progress === "Not started") {
            progress = "In progress";
            dispatch(addInProgressTodo({ date, title, progress, id, more }));
            dispatch(removeNewTodo(id));
        } else if (progress === "In progress") {
            progress = "Completed";
            dispatch(addCompletedTodo({ date, title, progress, id, more }));
            dispatch(removeInProgressTodo(id));
        }
    };

    const handleDelete = (toDoItem: ObjectContentType) => {
        if (toDoItem.progress === "Not started") dispatch(removeNewTodo(toDoItem.id));
        else if (toDoItem.progress === "Completed") dispatch(removeCompletedTodo(toDoItem.id));
    };

    if (data.length === 0) return <p>Empty</p>;

    return data.map((toDoItem, index) => {
        if (typeof toDoItem === typeof data[0])
            return (
                <article
                    style={{
                        background:
                            toDoItem.progress !== "Completed"
                                ? getColor(toDoItem.date, theme)
                                : "inherit",
                    }}
                    key={index}
                >
                    <p>{new Date(toDoItem.date).toString()}</p>
                    <div className="todoInfo">
                        <h2>{toDoItem.title}</h2>
                        <p>{toDoItem.more}</p>
                    </div>
                    <p>{toDoItem.progress} </p>
                    {toDoItem.progress !== "Completed" ? (
                        <button type="button" onClick={() => progressMade(toDoItem)}>
                            {"~>"}
                        </button>
                    ) : null}
                    {toDoItem.progress !== "In progress" ? (
                        <button type="button" onClick={() => handleDelete(toDoItem)}>
                            Delete
                        </button>
                    ) : null}
                </article>
            );
    });
};
