import React from 'react';
import './index.scss';

export default function TodoItem({ item }) {
    return (
        <li className="todo-item">
            <div className="check-box">
                <input type="checkbox" checked={ item.completed } />
            </div>
            <p className={ item.completed ? "content completed" : "content" }>{ item.content }</p>
            <div className="btn-group">
                <button className="btn btn-primary">查看</button>
                <button className="btn btn-warning">编辑</button>
                <button className="btn btn-danger">删除</button>
            </div>
        </li>
    );
};