import React from "react";
import {Button} from "./Button";
import { FilterValuesType } from "./App";

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
};

type TodolistPropTypes = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: number) => void;
    changeTodoListFilter: (filter: FilterValuesType) => void;
};

const Todolist: React.FC<TodolistPropTypes> = ({ title, tasks, removeTask}) => {
    const tasksItems: JSX.Element =
        tasks.length !== 0 ? (
            <ul>
                {tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} />
                            <span>{task.title}</span>
                            <button onClick={() => removeTask(task.id)}>x</button>
                        </li>
                    );
                })}
            </ul>
        ) : (
            <span> Давай, до свидания!</span>
        );

    function changeTodoListFilter(arg0: string): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input />
                <Button property="+" onClickHandler={() =>{}}/>
            </div>
            {tasksItems}
            <div>
                <Button property="All"  onClickHandler={() =>changeTodoListFilter('All')}/>
                <Button property="Active" onClickHandler={() =>changeTodoListFilter('Active')}/>
                <Button property="Completed" onClickHandler={() =>changeTodoListFilter('Completed')}/>
            </div>
        </div>
    );
};

export default Todolist;
