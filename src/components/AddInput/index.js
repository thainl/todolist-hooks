import React, { useRef, useEffect, memo } from "react";
import { Transition } from "react-transition-group";
import "./index.scss";

const AddInput = memo(function (props) {
    const { isInputShow, addItem } = props;
    const inputRef = useRef();
    const duration = 300;
    const defaultStyle = {
        transition: `all ${duration}ms`,
        opacity: "0",
        transform: "translateY(-100%)",
    };

    const transitionStyle = {
        entering: { opacity: "1", transform: "translateY(0)" },
        entered: { opacity: "1", transform: "translateY(0)" },
        exiting: { opacity: "0", transform: "translateY(-100%)" },
        exited: { opacity: "0", transform: "translateY(-100%)" },
    };

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
        <Transition in={isInputShow} timeout={duration}>
            {(state) => (
                <div
                    className="input-wrapper"
                    style={{ ...defaultStyle, ...transitionStyle[state] }}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="请输入待办事件"
                        onKeyUp={ handleKeyUp }
                    />
                    <button className="btn btn-primary" onClick={ submitInput }>增加</button>
                </div>
            )}
        </Transition>
    );
})

export default AddInput;