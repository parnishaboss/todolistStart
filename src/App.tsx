import React, {useState} from 'react';
import './App.css';
import {TodoList} from './Todolist';
import {v1} from 'uuid';


export type TaskType = {
    id: string
    isDone: boolean
    title: string
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type tasksObjType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const [tasksObj, setTasksObj] = useState<tasksObjType>({
        [todolistID1]: [
            {id: v1(), isDone: true, title: 'HTML&CSS'},
            {id: v1(), isDone: true, title: 'JS'},
            {id: v1(), isDone: false, title: 'React'},
            {id: v1(), isDone: false, title: 'Redux'}
        ],
        [todolistID2]: [
            {id: v1(), isDone: true, title: 'Milk'},
            {id: v1(), isDone: true, title: 'JS'},
            {id: v1(), isDone: false, title: 'React'},
            {id: v1(), isDone: false, title: 'Redux'}
        ]
    })

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},]
    )
    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        let todolist = todolists.find(t => t.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    const removeTask = (todolistID: string, id: string) => {
        let tasks = tasksObj[todolistID]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistID] = filteredTasks
        setTasksObj({...tasksObj})
    }
    const addTask = (todolistID: string, title: string) => {
        let newTask = {id: v1(), isDone: false, title: title}
        let tasks = tasksObj[todolistID]
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistID] = newTasks
        setTasksObj({...tasksObj})
    }
    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        let tasks = tasksObj[todolistID]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }


    return (
        <div className="App">
            {todolists.map(tl => {
                let tasksForTodolist = tasksObj[tl.id]
                if (tl.filter === 'active')
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                if (tl.filter === 'completed')
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                return (
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                    />
                )
            })}
        </div>
    );
}

export default App;
