import React, { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string, todolistId: string) => void;
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
    removeTodolist: (id: string) => void;
    changeTodolistTitle: (id: string, newTitle: string) => void;
    filter: FilterValuesType;
    changeTaskTitle: (
        taskId: string,
        newTitle: string,
        todolistId: string
    ) => void;
};

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    };

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    };
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    };

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () =>
        props.changeFilter("completed", props.id);

    return (
        <div>
            <h3>
                {" "}
                <EditableSpan
                    value={props.title}
                    onChange={changeTodolistTitle}
                />
                {/* <button onClick={removeTodolist}>x</button> */}
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {props.tasks.map((t) => {
                    const onClickHandler = () =>
                        props.removeTask(t.id, props.id);
                    const onChangeHandler = (
                        e: ChangeEvent<HTMLInputElement>
                    ) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    };
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    };

                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                checked={t.isDone}
                                onChange={onChangeHandler}
                            />
                            {/* <input
                                type="checkbox"
                                onChange={onChangeHandler}
                                checked={t.isDone}
                            /> */}
                            <EditableSpan
                                value={t.title}
                                onChange={onTitleChangeHandler}
                            />
                            {/* <button onClick={onClickHandler}>x</button> */}
                            <IconButton
                                aria-label="delete"
                                onClick={onClickHandler}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </li>
                    );
                })}
            </ul>
            <div>
                <Button
                    size="small"
                    variant={props.filter === "all" ? "outlined" : "contained"}
                    color="error"
                    onClick={onAllClickHandler}
                >
                    All
                </Button>
                <Button
                    size="small"
                    variant={
                        props.filter === "active" ? "outlined" : "contained"
                    }
                    onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button
                    size="small"
                    variant={
                        props.filter === "completed" ? "outlined" : "contained"
                    }
                    color="secondary"
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </Button>
                {/* <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button> */}
                {/* <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}
                >
                    Active
                </button> */}
                {/* <button
                    className={
                        props.filter === "completed" ? "active-filter" : ""
                    }
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </button> */}
            </div>
        </div>
    );
}
