import React from 'react';
import './index.scss';

export default function TodoItem({ item, clickViewBtn, clickEditBtn, clickDeleteBtn, clickCheckbox }) {
    return (
        <li className="todo-item">
            <div className="check-box">
                <input type="checkbox" checked={ item.completed } onChange={ clickCheckbox.bind(null, item.id) } />
            </div>
            <p className={ item.completed ? "content completed" : "content" }>{ item.content }</p>
            <div className="btn-group">
                <button className="btn btn-primary" onClick={ ()=>clickViewBtn(item.id) } >查看</button>
                <button className="btn btn-warning" onClick={ ()=>clickEditBtn(item.id) } >编辑</button>
                <button className="btn btn-danger" onClick={ ()=>clickDeleteBtn(item.id) }>删除</button>
            </div>
        </li>
    );
};