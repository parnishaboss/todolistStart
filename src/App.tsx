import React, {useState} from 'react';
import './App.css';
import {TodoList} from './Todolist';
import {v1} from 'uuid';


export type TaskType = {
    id: string
    isDone: boolean
    title: string
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), isDone: true, title: 'HTML&CSS'},
        {id: v1(), isDone: true, title: 'JS'},
        {id: v1(), isDone: false, title: 'React'},
        {id: v1(), isDone: false, title: 'Redux'}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')
    let tasksForTodolist = tasks
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }
    const addTask = (title:string) => {
        let newTask = {id: v1(), isDone: false, title: title}
        let newTasks = [newTask,...tasks]
        setTasks(newTasks)
    }
    const changeStatus = (taskId:string, isDone:boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }


    return (
        <div className="App">
            <TodoList title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
