import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import MyHeader from "./components/Header";
import AddInput from "./components/AddInput";
import TodoItem from "./components/TodoItem";
import OperationModal from "./components/OperationModal";
import Toast from "./components/Toast";
import NoDataTip from "./components/NoDataTip";
import './App.css';

class ClassApp extends Component {
    constructor() {
        super();
        this.state = {
            isInputShow: false,
            todoList: JSON.parse(localStorage.getItem("todoData") || "[]"),
            currentItem: {},
            showOperationModal: false,
            operationModalType: "",
        };
    }

    componentDidUpdate() {
        // 每次todoList发生变化重新写入本地储存
        if (
            localStorage.getItem("todoData") !=
            JSON.stringify(this.state.todoList)
        ) {
            localStorage.setItem(
                "todoData",
                JSON.stringify(this.state.todoList)
            );
        }
    }

    // 添加一条记录
    addItem = (value) => {
        const time = Date.now();
        const item = {
            id: time,
            updateTime: time,
            content: value,
            completed: false,
        };
        this.setState({
            todoList: [item, ...this.state.todoList],
            isInputShow: false,
        });
    };

    // 改变当前要查看或编辑的记录
    changeCurrentItem = (id) => {
        const currentItem = this.state.todoList.filter((item) => item.id === id)[0];
        this.setState({currentItem});
    }

    // 打开操作模态框
    openOperationModal = (type, id) => {
        this.setState({
            operationModalType: type,
            showOperationModal: true
        })
        this.changeCurrentItem(id);
    }

    // 关闭操作模态框
    closeOperationModal = () => {
        this.setState({
            operationModalType: '',
            showOperationModal: false,
            currentItem: {}
        })
    }

    // 点击列表项的查看按钮
    handleViewItem = (id) => {
        this.openOperationModal('view', id);
    }

    // 点击列表项的编辑按钮
    handleEditItem = (id) => {
        this.openOperationModal('edit', id);
    }

    // 点击列表项的删除按钮
    handleDeleteItem = (id) => {
        this.openOperationModal('delete', id);
    }

    // 点击checkbox改变状态
    handleClickCheckbox = (id) => {
        let todoList = this.state.todoList.map((item) => {
            if (item.id === id) item.completed = !item.completed;
            return item;
        })
        this.setState({todoList})
    }

    // 点击查看弹框里的确定按钮
    handleClickViewConfirmBtn = () => {
        this.closeOperationModal();
    }

    // 点击编辑弹框里的保存按钮
    handleClickEditSaveBtn = (newData, oldId) => {
        if (oldId) {
            let todoList = this.state.todoList.map((item) => {
                if (item.id === oldId) {
                    Object.assign(item, newData);
                }
                return item;
            })
            this.setState({todoList});
            Toast.toast('修改成功', 1000)
        }
        this.closeOperationModal();
    }

    // 点击删除弹框里的确定按钮
    handleClickDeleteConfirmBtn = (id)=> {
        let todoList = this.state.todoList.filter(item => item.id !== id);
        this.setState({todoList})
        Toast.toast('删除成功', 1000);
        this.closeOperationModal();
    }

    // 点击删除弹框里的取消按钮
    handleClickDeleteCancelBtn = ()=> {
        this.closeOperationModal();
    }
    

    render() {
        const {
            isInputShow,
            todoList,
            currentItem,
            showOperationModal,
            operationModalType
        } = this.state;
        const {
            addItem,
            handleViewItem,
            handleEditItem,
            handleDeleteItem,
            handleClickCheckbox,
            handleClickViewConfirmBtn,
            handleClickEditSaveBtn,
            handleClickDeleteConfirmBtn,
            handleClickDeleteCancelBtn
        } = this;
        return (
            <div className="App">
                <MyHeader
                    isInputShow={isInputShow}
                    openInput={() => this.setState({isInputShow: !isInputShow})}
                />
                <AddInput isInputShow={isInputShow} addItem={addItem} />
                <div
                    className="todo-list"
                    style={{
                        transform: isInputShow ? "translateY(1.52rem)" : "none",
                    }}
                >
                    <TransitionGroup component="ul">
                        {
                            todoList.length !== 0 &&
                            todoList.map((item) => (
                                <CSSTransition 
                                    classNames="item"
                                    key={item.id}
                                    timeout={600}
                                    appear={true}
                                >
                                    <TodoItem
                                        item={item}
                                        clickViewBtn={handleViewItem}
                                        clickEditBtn={handleEditItem}
                                        clickDeleteBtn={handleDeleteItem}
                                        clickCheckbox={handleClickCheckbox}
                                    />
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                </div>
                <OperationModal
                    type={operationModalType}
                    data={currentItem}
                    show={showOperationModal}
                    clickViewConfirmBtn={handleClickViewConfirmBtn}
                    clickEditSaveBtn={handleClickEditSaveBtn}
                    clickDeleteConfirmBtn={handleClickDeleteConfirmBtn}
                    clickDeleteCancelBtn={handleClickDeleteCancelBtn}
                />
                <CSSTransition in={ todoList.length === 0 } unmountOnExit timeout={300} classNames="no-data" >
                    <NoDataTip />
                </CSSTransition>
            </div>
        );
    }
}

export default ClassApp;
