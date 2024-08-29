import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Box, IconButton, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';

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
        <Box sx={{display: 'flex'}}>
            <TextField
                variant={'standard'}
                label={'Type value'}
                error={!!error}
                value={title}
                onChange={onNewTitleChangeHandler}
                onKeyUp={addTaskOnKeyUpHandler}
                helperText={error}
            />
            <IconButton  color={'primary'} onClick={addTaskHandler}>
                <AddBox/>
            </IconButton>
        </Box>
    )
}