import React, { useState } from "react";
import "./App.css";
import Todolist, { TaskType } from "./Todolist";

export type FilterValuesType = 'all'| 'active' | 'complited'
function App() {
    // console.log(crypto.randomUUID()) генерация уникальных id в браузере
    const todoListTitle = "What to learn";

    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: 1, title: "HTML", isDone: false },
        { id: 2, title: "CSS", isDone: false },
        { id: 3, title: "JS/TS", isDone: true },
        { id: 4, title: "React", isDone: true },
    ]);
    const removeTask = (taskId: number) => {
        const nextState: Array<TaskType> = tasks.filter(
            (task) => task.id !== taskId);
            // nextState !== tasks => new array
        setTasks(nextState);
    };

    
    const [filter, setFilter] = useState<FilterValuesType>('all')

    
    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const tasksForTodoList: Array<TaskType> = filter === 'active'
        ? tasks.filter(t => t.isDone === false)
        :filter === 'complited'
            ? tasks.filter(t => t.isDone === true)
            : tasks

    return (
        <div className="App">
            <Todolist
                title={todoListTitle}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
