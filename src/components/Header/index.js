import React from 'react';
import './index.scss';

export default function Header(props) {
    const { openInput, isInputShow } = props;

    return (
        <div className="header">
            <h1>待办事件</h1>
            <span className={ isInputShow ? "icon rotate" : "icon"} onClick={ openInput }>&#43;</span>
        </div>
    );
};