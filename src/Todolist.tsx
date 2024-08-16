import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter:FilterValuesType
}

export const TodoList = (props: PropsType) => {
    // const {title, tasks} = props    ------     диструктуризация
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError('Title is requered')
        }
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }


    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={onNewTitleChangeHandler}
                    onKeyUp={addTaskOnKeyUpHandler}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        const removeTaskHandler = () => {
                            props.removeTask(t.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ""}>
                                <input
                                    type="checkbox"
                                    onChange={onChangeHandler}
                                    checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={removeTaskHandler}>del</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}