import React, { useCallback, useEffect, useRef } from "react";
import { getTextWidth, throttle, debounce } from "../../libs/utils";
import Checkbox from "../Checkbox";
import "./index.scss";

export default function TodoItem({
    item,
    clickViewBtn,
    clickEditBtn,
    clickDeleteBtn,
    clickCheckbox,
}) {
    const contentRef = useRef();
    const lineRef = useRef();
    const flagRef = useRef(true);
    useEffect(()=> {
        if(flagRef.current) {
            // 首次渲染不执行过渡
            flagRef.current = false;
            contentRef.current.style.transition = 'none';
            lineRef.current.style.transition = 'none';
        }else {
            if(contentRef.current.style.transition.includes('none 0s')) {
                contentRef.current.style.transition = null;
                lineRef.current.style.transition = null;
            }
        }
        contentRef.current.style.backgroundPosition = item.completed ? getTextWidth(item.content) : '0';
        lineRef.current.style.width = item.completed ? getTextWidth(item.content) : '0';
    }, [item.content, item.completed]);

    function btnClickable() {
        const oModal = document.querySelector('.modal-wrapper');
        if(!oModal || oModal.style.display == 'none') return true;
        return false;
    }

    return (
        <li className="todo-item">
            <div className="wrapper">
                <div className="check-box">
                    <Checkbox checked={item.completed} onChange={clickCheckbox.bind(null, item.id)} />
                </div>
                <p
                    className="content"
                    ref={contentRef}
                >
                    {item.content}
                    <span className="line" ref={lineRef}></span>
                </p>
                <div className="btn-group">
                    <button
                        className="btn btn-primary"
                        onClick={() => btnClickable() && clickViewBtn(item.id)}
                    >
                        查看
                    </button>
                    <button
                        className="btn btn-warning"
                        onClick={() => btnClickable() && clickEditBtn(item.id)}
                    >
                        编辑
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => btnClickable() && clickDeleteBtn(item.id)}
                    >
                        删除
                    </button>
                </div>
            </div>
        </li>
    );
}