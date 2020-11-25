import React from "react";
import { generateUUID } from "../../libs/utils";
import "./index.scss";

export default function MyCheckbox({ children, checked, onChange }) {
    const uuid = generateUUID();
    return (
        <label htmlFor={uuid} className="my-checkbox-wrapper">
            <input
                id={uuid}
                type="checkbox"
                className="input-checkbox"
                defaultChecked={checked}
                onChange={() => typeof onChange === 'function' ? onChange() : null}
            />
            <span className="my-checkbox">
                <svg className="svg">
                    <polyline points="2 5.5 4.5 8 9.5 1.5"></polyline>
                </svg>
            </span>
            <span className="text">{children}</span>
        </label>
    );
}
