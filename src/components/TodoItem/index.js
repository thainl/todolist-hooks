import React, { useEffect, useRef } from "react";
import { getTextWidth } from "../../libs/utils";
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
    useEffect(()=> {
        contentRef.current.style.backgroundPosition = item.completed ? getTextWidth(item.content) : '0';
        lineRef.current.style.width = item.completed ? getTextWidth(item.content) : '0';
    }, [item.content, item.completed]);

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
                        onClick={() => clickViewBtn(item.id)}
                    >
                        查看
                    </button>
                    <button
                        className="btn btn-warning"
                        onClick={() => clickEditBtn(item.id)}
                    >
                        编辑
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => clickDeleteBtn(item.id)}
                    >
                        删除
                    </button>
                </div>
            </div>
        </li>
    );
}