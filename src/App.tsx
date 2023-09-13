import { useEffect, useState } from "react";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";

import { ObjectContentType } from "./utils/types";
import { getColor } from "./utils/getColor";

import { useAppSelector, useAppDispatch } from "./store/store";
import { addNewLocalStorageTodos } from "./store/unstartedTodoSlice";
import { addInProgressLocalStorageTodos } from "./store/inProgressTodoSlice";
import { addCompletedLocalStorageTodos } from "./store/completedTodoSlice";

import { SectionOfToDos } from "./components/SectionOfTodos";
import { AddNewToDo } from "./components/AddNewToDo";

function App() {
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [loadingData, setLoadingData] = useState(true);
    const [toDoViews, setToDoViews] = useState({
        inProgressClosed: false,
        notStartedClosed: true,
        completedClosed: true,
    });
    const dispatch = useAppDispatch();
    const [showAddFormBoolean, setShowAddFormBoolean] = useState(false);
    const completed = useAppSelector((state) => state.completedToDo);
    const notStarted = useAppSelector((state) => state.unstartedToDo);
    const inProgress = useAppSelector((state) => state.inProgressToDo);

    if (loadingData) {
        const localStorageData = localStorage.getItem("todo");
        if (localStorageData === null) return;
        const todoItem: {
            completed: ObjectContentType[];
            notStarted: ObjectContentType[];
            inProgress: ObjectContentType[];
        } = JSON.parse(localStorageData);

        dispatch(addNewLocalStorageTodos(todoItem.notStarted));
        dispatch(addInProgressLocalStorageTodos(todoItem.inProgress));
        dispatch(addCompletedLocalStorageTodos(todoItem.completed));
        setLoadingData(false);
    }

    if (loadingData === false)
        localStorage.setItem("todo", JSON.stringify({ completed, notStarted, inProgress }));

    useEffect(() => {
        document.documentElement.classList.toggle("light");
    }, [theme]);

    return (
        <>
            <header>
                <button
                    onClick={() => {
                        theme === "light" ? setTheme("dark") : setTheme("light");
                    }}
                >
                    {theme}
                </button>
                <div className="heading">
                    <h1>{new Date().toDateString()}</h1>
                    {showAddFormBoolean === false ? (
                        <button
                            className="addTodo heading-addTodo"
                            type="button"
                            onClick={() => setShowAddFormBoolean(true)}
                        >
                            +
                        </button>
                    ) : null}
                </div>
                {showAddFormBoolean === true ? (
                    <AddNewToDo setShowAddFormBoolean={setShowAddFormBoolean} />
                ) : null}
            </header>
            <main>
                <section className="main-section">
                    <button
                        className="main-section-heading"
                        type="button"
                        style={{
                            color: getColor(inProgress[0]?.date, theme),
                        }}
                        onClick={() =>
                            setToDoViews({
                                ...toDoViews,
                                inProgressClosed: !toDoViews.inProgressClosed,
                            })
                        }
                    >
                        In Progress
                        {toDoViews.inProgressClosed === false ? <FaArrowDown /> : <FaArrowRight />}
                    </button>
                    {toDoViews.inProgressClosed === false ? (
                        <SectionOfToDos data={inProgress} theme={theme} />
                    ) : (
                        <p>{inProgress.length} todos in progress.</p>
                    )}
                </section>
                <section className="main-section">
                    <button
                        className="main-section-heading"
                        type="button"
                        style={{
                            color: getColor(notStarted[0]?.date, theme),
                        }}
                        onClick={() =>
                            setToDoViews({
                                ...toDoViews,
                                notStartedClosed: !toDoViews.notStartedClosed,
                            })
                        }
                    >
                        Not started
                        {toDoViews.notStartedClosed === false ? <FaArrowDown /> : <FaArrowRight />}
                    </button>
                    {toDoViews.notStartedClosed === false ? (
                        <SectionOfToDos data={notStarted} theme={theme} />
                    ) : (
                        <p>{notStarted.length} todos yet too start.</p>
                    )}
                </section>
                <section className="main-section">
                    <button
                        className="main-section-heading"
                        type="button"
                        onClick={() =>
                            setToDoViews({
                                ...toDoViews,
                                completedClosed: !toDoViews.completedClosed,
                            })
                        }
                    >
                        Completed
                        {toDoViews.completedClosed === false ? <FaArrowDown /> : <FaArrowRight />}
                    </button>
                    {toDoViews.completedClosed === false ? (
                        <SectionOfToDos data={completed} theme={theme} />
                    ) : (
                        <p>{completed.length} todos completed.</p>
                    )}
                </section>
            </main>
            <footer>
                <a href="https://www.freepik.com/icon/test_1205526#fromView=search&term=todo&page=1&position=34">
                    Favicon by Freepik
                </a>
            </footer>
        </>
    );
}

export default App;
