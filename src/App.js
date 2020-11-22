import "./App.css";
import React, { useState, useCallback, useEffect, useLayoutEffect } from "react";
import MyHeader from "./components/Header";
import AddInput from "./components/AddInput";
import TodoItem from './components/TodoItem';

function App() {
    const [isInputShow, setIsInputShow] = useState(false);
    const [todoList, setTodoList] = useState([]);

    useEffect(()=> {
        console.log('读取');
        const todoData = JSON.parse(localStorage.getItem('todoData') || '[]');
        setTodoList(todoData);
    }, [])

    useLayoutEffect(()=> {
        if(localStorage.getItem('todoData') != JSON.stringify(todoList) && todoList.length) {
            localStorage.setItem('todoData', JSON.stringify(todoList));
        }
    }, [todoList])

    const addItem = useCallback((value) => {
        const item = {
            id: Date.now(),
            content: value,
            completed: false
        };
        setTodoList((todoList) => ([...todoList, item])); // 添加一条记录
        setIsInputShow(false); // 隐藏输入框
    }, [])
    return (
        <div className="App">
            <MyHeader isInputShow={isInputShow} openInput={ ()=>setIsInputShow(!isInputShow) } />
            <AddInput isInputShow={isInputShow} addItem={ addItem } />
            <ul className="todo-list" style={{ transform: isInputShow ? 'translateY(1.52rem)' : 'none' }}>
                {
                    todoList.length !== 0 && todoList.map(item => (
                        <TodoItem item={ item } key={ item.id } />
                    ))
                }
            </ul>
        </div>
    );
}

export default App;
