import React, {ChangeEvent, useState} from 'react';

export type editableSpanPropsType = {
    title: string
    onChange: (newTitle:string) => void
}
export const EditableSpan = (props: editableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangehandler = (event:ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        editMode
            ? <input
                onChange={onChangehandler}
                value={title}
                onBlur={activateViewMode}
                autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )

}