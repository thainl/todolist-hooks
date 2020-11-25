import React, { Component } from "react";
import { getTextWidth } from "../../libs/utils";
import '../TodoItem/index.scss';
export default class TodoItem extends Component{
    constructor(props) {
        super(props);
        this.contentRef = React.createRef();
        this.lineRef = React.createRef();
    }
    componentDidUpdate() {
        this.contentRef.current.style.backgroundPosition = this.props.item.completed ? getTextWidth(this.props.item.content) : '0';
        this.lineRef.current.style.width = this.props.item.completed ? getTextWidth(this.props.item.content) : '0';
    }
    shouldComponentUpdate(nextProps) {
        if(this.props.item == nextProps.item) {
            console.log(this.props.item == nextProps.item);
            return false;
        }
        return true;
    }
    render() {
        const {
            item,
            clickViewBtn,
            clickEditBtn,
            clickDeleteBtn,
            clickCheckbox} = this.props;
        return (
            <li className="todo-item">
                <div className="wrapper">
                    <div className="check-box">
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={clickCheckbox.bind(null, item.id)}
                        />
                    </div>
                    <p
                        className="content"
                        ref={this.contentRef}
                    >
                        {item.content}
                        <span className="line" ref={this.lineRef}></span>
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
};