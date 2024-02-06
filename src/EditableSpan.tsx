import React, {ChangeEvent, useState} from 'react';

type EditableSpanProps = {
    oldTitle: string
    callBack: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanProps) => {
    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.oldTitle)


    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            props.callBack(newTitle)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        edit
            ? <input onBlur={editHandler} autoFocus value={newTitle} onChange={onChangeHandler}/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
};

