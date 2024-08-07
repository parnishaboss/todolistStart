import React from 'react';
import './App.css';
import {TodoList} from './Todolist';


export type TaskType = {
    id: number
    isDone: boolean
    title: string
}

function App() {

    const todolistTitle: string = 'What to learn'
    const tasks: Array<TaskType> = [
        {id: 1, isDone: true, title: 'HTML&CSS'},
        {id: 2, isDone: false, title: 'JS'},
        {id: 3, isDone: false, title: 'React'},
        {id: 4, isDone: true, title: 'Redux'}
    ]


    return (
        <div className="App">
            <TodoList title={todolistTitle}
                      tasks={tasks}/>
        </div>
    );
}

export default App;
