import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type addItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: addItemFormPropsType) => {
    const [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState('')

    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
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
    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={title}
                onChange={onNewTitleChangeHandler}
                onKeyUp={addTaskOnKeyUpHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}