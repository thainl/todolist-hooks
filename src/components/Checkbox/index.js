import React, { forwardRef, useRef } from "react";
import { generateUUID } from "../../libs/utils";
import "./index.scss";

// forwardRef 用于在子组件中，想要给父组件获取到的dom元素
const Checkbox = forwardRef(({ children, checked, onChange }, inputRef)=> {
    const uuid = generateUUID();
    const checkboxRef = useRef();
    const handleOnChange = () => {
        if(typeof onChange === 'function') onChange();
        let active;
        if(inputRef) {
            active = inputRef.current.checked
        }else {
            active = !checked
        };
        checkboxRef.current.style.animation = active ? 'wave 0.4s ease' : 'none';
    }
    // props里的checked改变后，如果defaultChecked也要更新变化，需要给一个key值
    return (
        <label htmlFor={uuid} className="my-checkbox-wrapper">
            <input
                id={uuid}
                type="checkbox"
                className="input-checkbox"
                defaultChecked={checked}
                ref={inputRef}
                onChange={handleOnChange}
                key={uuid}
            />
            <span className="my-checkbox" ref={checkboxRef}>
                <svg className="svg">
                    <polyline points="2 5.5 4.5 8 9.5 1.5"></polyline>
                </svg>
            </span>
            <span className="text">{children}</span>
        </label>
    );
})

export default Checkbox;