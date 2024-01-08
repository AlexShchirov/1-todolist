import React from 'react';

type ButtonPropsType = {
    property: string,
    onClickHandler: () => void
}

export const Button: React.FC<ButtonPropsType> = ({property, onClickHandler}) => {
    return (
        <button onClick={onClickHandler}>
            {property}
        </button>
    );
};
