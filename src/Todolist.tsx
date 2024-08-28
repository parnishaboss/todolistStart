import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton, ListItem} from '@mui/material';
import {Delete} from '@mui/icons-material';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolsit: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
}

export const TodoList = (props: PropsType) => {
    // const {title, tasks} = props    ------     диструктуризация
    const onAllClickHandler = () => {
        props.changeFilter(props.id, 'all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.id, 'active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.id, 'completed')
    }
    const removeTodolistHandler = () => {
        props.removeTodolsit(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }
    const onChangeTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    return (
        <div className="todolist">
            <h3>
                <EditableSpan title={props.title} onChange={onChangeTitleHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm
                addItem={addTask}
            />
            <ul>
                {
                    props.tasks.map((t) => {
                        const removeTaskHandler = () => {
                            props.removeTask(props.id, t.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(props.id, t.id, e.currentTarget.checked)
                        }
                        const onChangeTitleHandler = (newTitle: string) => {
                            props.changeTaskTitle(props.id, t.id, newTitle)
                        }
                        return (

                            <ListItem key={t.id}
                                      sx={{
                                          p: 0,
                                          justifyContent: 'space-between',
                                          opacity: t.isDone ? 0.5 : 1,
                                      }}>
                                <div>
                                    <Checkbox
                                        onChange={onChangeStatusHandler}
                                        checked={t.isDone}/>
                                    <EditableSpan
                                        title={t.title}
                                        onChange={onChangeTitleHandler}/>
                                </div>
                                <IconButton onClick={removeTaskHandler}>
                                    <Delete/>
                                </IconButton>
                            </ListItem>
                        )
                    })
                }
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} color={'primary'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter === 'active' ? 'contained' : 'text'} color={'primary'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'contained' : 'text'} color={'primary'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

// import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
// import {FilterValuesType, TaskType} from './App';
//
// type PropsType = {
//     id:string
//     title: string
//     tasks: Array<TaskType>
//     removeTask: (todolistID: string, id: string) => void
//     changeFilter: (todolistID: string,value: FilterValuesType) => void
//     addTask: (todolistID: string, title: string) => void
//     changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
//     filter:FilterValuesType
//     removeTodolsit:(todolistID: string) => void
// }
//
// export const TodoList = (props: PropsType) => {
//     // const {title, tasks} = props    ------     диструктуризация
//     const [title, setTitle] = useState('')
//     const [error, setError] = useState<string | null>(null)
//     const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//         setTitle(event.currentTarget.value)
//     }
//     const addTaskHandler = () => {
//         if (title.trim() !== '') {
//             props.addTask(props.id ,title)
//             setTitle('')
//         } else {
//             setError('Title is requered')
//         }
//     }
//     const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
//         setError(null)
//         if (event.key === 'Enter') {
//             addTaskHandler()
//         }
//     }
//     const onAllClickHandler = () => {
//         props.changeFilter(props.id ,'all')
//     }
//     const onActiveClickHandler = () => {
//         props.changeFilter(props.id ,'active')
//     }
//     const onCompletedClickHandler = () => {
//         props.changeFilter(props.id ,'completed')
//     }
//     const removeTodolistHandler = () => {
//         props.removeTodolsit(props.id)
//     }
//
//     return (
//         <div className="todolist">
//             <h3>{props.title}
//                 <button onClick={removeTodolistHandler}>del</button></h3>
//             <div>
//                 <input
//                     className={error ? 'error' : ''}
//                     value={title}
//                     onChange={onNewTitleChangeHandler}
//                     onKeyUp={addTaskOnKeyUpHandler}/>
//                 <button onClick={addTaskHandler}>+</button>
//                 {error && <div className="error-message">{error}</div>}
//             </div>
//             <ul>
//                 {
//                     props.tasks.map((t) => {
//                         const removeTaskHandler = () => {
//                             props.removeTask(props.id, t.id)
//                         }
//                         const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//                             props.changeStatus(props.id, t.id, e.currentTarget.checked)
//                         }
//                         return (
//                             <li key={t.id} className={t.isDone ? 'is-done' : ""}>
//                                 <input
//                                     type="checkbox"
//                                     onChange={onChangeHandler}
//                                     checked={t.isDone}/>
//                                 <span>{t.title}</span>
//                                 <button onClick={removeTaskHandler}>-</button>
//                             </li>
//                         )
//                     })
//                 }
//             </ul>
//             <div>
//                 <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
//                 <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
//                 <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
//             </div>
//         </div>
//     )
// }