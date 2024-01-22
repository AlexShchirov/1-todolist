import React, { ChangeEvent, FC, useState, KeyboardEvent } from "react";
import { Button } from "./Button";
import { FiltervaluesType } from "./App";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string) => void;
    addTask: (title: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean) => void;
    // changeTododListFilter: (filter: FiltervaluesType) => void
};

export const TodoList: FC<TodoListPropsType> = ({
    title, // title: title
    tasks, // task: task
    removeTask, // removeTask: removeTask
    addTask,
    changeTaskStatus,
    // changeTododListFilter
}) => {
    const [filter, setFilter] = useState<FiltervaluesType>("all");
    const [taskTitle, setTaskTitle] = useState("");
    const [error, setError] = useState(false);
    const [isHide, setIsHide] = useState(false);

    const toggleHideTodoList = () => setIsHide(!isHide);

    const changeTododListFilter = (filter: FiltervaluesType) => {
        setFilter(filter);
    };
    const addNewTaskTitleHandler = () => {
        const trimmedTaskTitle = taskTitle.trim();
        if (trimmedTaskTitle) {
            addTask(trimmedTaskTitle);
        } else {
            setError(true);
        }
        setTaskTitle("");
    };

    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
        // error && setError(false) // !!!
        setTaskTitle(e.currentTarget.value);

    const addTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addNewTaskTitleHandler();
    };

    const changeFilterHandlerCreator = (filter: FiltervaluesType) => {
        return () => changeTododListFilter(filter);
    };

    // const tasksForTodoList: Array<TaskType> = filter === "active"
    //         ? tasks.filter((t) => !t.isDone)
    //         : filter === "completed"
    //              ? tasks.filter((t) => t.isDone)
    //              : tasks;

    const getFilteredTasks = (
        allTasks: Array<TaskType>,
        filterValue: FiltervaluesType
    ) => {
        switch (filterValue) {
            case "active":
                return allTasks.filter((t) => !t.isDone);
            case "completed":
                return allTasks.filter((t) => t.isDone);
            default:
                return allTasks;
        }
    };
    const tasksForTodoList: Array<TaskType> = getFilteredTasks(tasks, filter);

    const countActiveTaskForHideMode = isHide
        ? getFilteredTasks(tasks, "active").length
        : null;

    const tasksItems: JSX.Element =
        tasksForTodoList.length !== 0 ? (
            <ul>
                {tasksForTodoList.map((task) => {
                    const removeTaskHandler = () => removeTask(task.id);
                    const changeTaskStatusHandler = (
                        e: ChangeEvent<HTMLInputElement>
                    ) => changeTaskStatus(task.id, e.currentTarget.checked);
                    const taskClass = task.isDone ? "task-done" : "task";
                    return (
                        <li key={task.id}>
                            <input
                                className={error ? "task-input-error" : ""}
                                type="checkbox"
                                checked={task.isDone}
                                onChange={changeTaskStatusHandler}
                            />
                            <span className={taskClass}>{task.title}</span>
                            <Button
                                title="x"
                                onClickHandler={removeTaskHandler}
                            />
                        </li>
                    );
                })}
            </ul>
        ) : (
            <span>Давай, до свидания!</span>
        );

    return (
        <div className="todolist">
            <h3>
                {title}
                <Button
                    title={isHide ? "Show" : "Hide"}
                    onClickHandler={toggleHideTodoList}
                />
            </h3>
            {isHide && (
                <div>{`У вас ${countActiveTaskForHideMode} невыполненных задач`}</div>
            )}
            {!isHide && (
                <>
                    <div>
                        <input
                            value={taskTitle}
                            onChange={setTaskTitleHandler}
                            onKeyDown={addTaskOnKeyDownHandler} // добавление по enter
                        />
                        <Button
                            title="+"
                            isDisabled={!taskTitle}
                            onClickHandler={addNewTaskTitleHandler}
                        />
                        {taskTitle.length > 15 && (
                            <div style={{ color: "red" }}>be more humble</div>
                        )}
                        {error && (
                            <div style={{ color: "red" }}>
                                Введите название таски
                            </div>
                        )}
                    </div>
                    {tasksItems}
                    <div className="btns-filter-block">
                        <Button
                            classes={
                                filter === "all" ? "btn-filter-active" : ""
                            }
                            title="All"
                            onClickHandler={changeFilterHandlerCreator("all")}
                        />
                        <Button
                            classes={
                                filter === "active" ? "btn-filter-active" : ""
                            }
                            title="Active"
                            onClickHandler={changeFilterHandlerCreator(
                                "active"
                            )}
                        />
                        <Button
                            classes={
                                filter === "completed"
                                    ? "btn-filter-active"
                                    : ""
                            }
                            title="Completed"
                            onClickHandler={changeFilterHandlerCreator(
                                "completed"
                            )}
                        />
                    </div>
                </>
            )}
        </div>
    );
};
