import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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
            <TextField
                variant={'standard'}
                label={'Type value'}
                error={!!error}
                value={title}
                onChange={onNewTitleChangeHandler}
                onKeyUp={addTaskOnKeyUpHandler}
                helperText={error}
            />
            <IconButton sx={{pt:'20px'}} color={'primary'} onClick={addTaskHandler}>
                <AddIcon/>
            </IconButton>
        </div>
    )
}