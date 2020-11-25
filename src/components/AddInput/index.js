import React, { useRef, useEffect, memo } from "react";
import { CSSTransition } from "react-transition-group";
import "./index.scss";

const AddInput = memo(function (props) {
    const { isInputShow, addItem } = props;
    const inputRef = useRef();
    useEffect(() => {
        if (isInputShow) {
            inputRef.current.focus()
        }else {
            inputRef.current.blur();
        }
    }, [isInputShow]);

    const submitInput = () => {
        const inputVal = inputRef.current.value.trim();
        if(inputVal === '') return;
        addItem(inputVal);
        inputRef.current.value = '';
    }

    function handleKeyUp(e) {
        if(e.keyCode === 13 && isInputShow) {
            submitInput();
        }
    }

    return (
        <CSSTransition in={isInputShow} timeout={300} classNames="slide">
            <div className="input-wrapper">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="请输入待办事件"
                    onKeyUp={ handleKeyUp }
                />
                <button className="btn btn-primary" onClick={ submitInput }>增加</button>
            </div>
        </CSSTransition>
    );
})

export default AddInput;