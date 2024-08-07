import React, {FC} from 'react';
import {TaskType} from './App';

type TodolistPropsType = {
    title: string

    tasks: Array<TaskType>
}

export const TodoList: FC<TodolistPropsType> = ({title, tasks}) => {
    // const {title, tasks} = props    ------     диструктуризация
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    tasks.length === 0
                        ? <span>Empty list!</span>
                        :
                        tasks.map((t) => (
                            <li>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                            </li>
                        ))
                }
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}