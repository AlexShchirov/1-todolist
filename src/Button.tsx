import React, { FC } from "react";

type ButtonPropsType = {
    title: string;
    onClickHandler: () => void;
    isDisabled?: boolean;
};

export const Button: FC<ButtonPropsType> = ({
    title,
    onClickHandler,
    isDisabled,
}) => {
    return (
        <button disabled={isDisabled} onClick={onClickHandler}>
            {title}
        </button>
    );
};
