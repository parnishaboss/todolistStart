import React from 'react';
import './App.css';
import {TodoList} from './Todolist';


export type TaskType = {
    id: number
    isDone: boolean
    title: string
}

function App() {

    const todolistTitle_1: string = 'What to learn'
    const todolistTitle_2: string = 'What to buy'
    const tasks_1: Array<TaskType> = [
        {id: 1, isDone: true, title: 'HTML&CSS'},
        {id: 2, isDone: false, title: 'JS'},
        {id: 3, isDone: false, title: 'React'},
        {id: 4, isDone: true, title: 'Redux'}
    ]
    const tasks_2: Array<TaskType> = [
        {id: 5, isDone: false, title: 'Milk'},
        {id: 6, isDone: true, title: 'Bread'},
        {id: 7, isDone: true, title: 'Apple'},
        {id: 8, isDone: false, title: 'Orange'}
    ]


    return (
        <div className="App">
            <TodoList title={todolistTitle_1}
                      tasks={tasks_1}/>
            <TodoList title={todolistTitle_2}
                      tasks={tasks_2}/>
        </div>
    );
}

export default App;
