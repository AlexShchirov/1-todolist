import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    };

    const styles = {
        maxWidth: "40px",
        maxHeight: "40px",
        minWidth: "40px",
        minHeight: "40px",
    };

    return (
        <div>
            {/* <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            /> */}
            <TextField
                error={!!error}
                id="outlined-basic"
                size="small"
                label={error ? error : 'write smth...'}
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <Button
                size="small"
                variant="contained"
                sx={styles}
                onClick={addItem}
            >
                +
            </Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}
