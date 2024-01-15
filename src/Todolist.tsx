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
    // changeTododListFilter: (filter: FiltervaluesType) => void
};

export const TodoList: FC<TodoListPropsType> = ({
    title, // title: title
    tasks, // task: task
    removeTask, // removeTask: removeTask
    addTask,
    // changeTododListFilter
}) => {
    const [filter, setFilter] = useState<FiltervaluesType>("all");
    const [taskTitle, setTaskTitle] = useState("");
    const changeTododListFilter = (filter: FiltervaluesType) => {
        setFilter(filter);
    };
    const addNewTaskTitleHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }

    const setTaskTitleHandler= (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value) 

    const addTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {if (e.key === 'Enter') addNewTaskTitleHandler()}

    const changeFilterHandlerCreator = (filter: FiltervaluesType) => {
        return () => changeTododListFilter(filter)
    }

    const tasksForTodoList: Array<TaskType> =
        filter === "active"
            ? tasks.filter((t) => !t.isDone)
            : filter === "completed"
            ? tasks.filter((t) => t.isDone)
            : tasks;

    const tasksItems: JSX.Element =
        tasksForTodoList.length !== 0 ? (
            <ul>
                {tasksForTodoList.map((task) => {
                    const removeTaskHandler =() => removeTask(task.id)
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} />
                            <span>{task.title}</span>
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
            <h3>{title}</h3>
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
                {taskTitle.length > 15 && <div style={{color:'red'}}>be more humble</div> }
            </div>
            {tasksItems}
            <div>
                <Button
                    title="All"
                    onClickHandler={changeFilterHandlerCreator('all')}
                />
                <Button
                    title="Active"
                    onClickHandler={changeFilterHandlerCreator("active")}
                />
                <Button
                    title="Completed"
                    onClickHandler={changeFilterHandlerCreator  ("completed")}
                />
            </div>
        </div>
    );
};
