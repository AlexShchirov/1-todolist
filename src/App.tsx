import React, { useState } from 'react';
import './App.css';
import { TodoList, TaskType } from './Todolist';
import { v1 } from 'uuid';

export type FiltervaluesType = "all" | "active" | "completed"


function App() {
    //CRUD
    const todoListTitle = "What to learn"
    const [tasks, setTasks] = React.useState<Array<TaskType>>([
        { id: v1(), title: "HTML", isDone: false },
        { id: v1(), title: "CSS", isDone: false },
        { id: v1(), title: "JS/TS", isDone: true },
        { id: v1(), title: "REACT", isDone: true },
    ])

    const removeTask = (taskId: string) => {
        const nextState: Array<TaskType> = tasks.filter(task => task.id !== taskId)
        setTasks(nextState)
    }
    
    //Добавляет новые таски
    const addTask = (title: string) => {
        const newTask: TaskType = { 
            id: v1(),
            title, // title: title
            isDone: false,
        } 
        const nextState: Array<TaskType> = [newTask, ...tasks]
        setTasks(nextState)
    }
    

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasks}
                addTask={addTask}
                removeTask={removeTask}
                // changeTododListFilter={changeTododListFilter}
            />
        </div>
    );
}

export default App;
