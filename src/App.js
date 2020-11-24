import "./App.css";
import React, {
    useState,
    useCallback,
    useEffect,
    useLayoutEffect,
} from "react";
import MyHeader from "./components/Header";
import AddInput from "./components/AddInput";
import TodoItem from "./components/TodoItem";
import OperationModal from "./components/OperationModal";
import Toast from './components/Toast';

function App() {
    const [isInputShow, setIsInputShow] = useState(false),
          [todoList, setTodoList] = useState([]),
          [currentItem, setCurrentItem] = useState({}),
          [showOperationModal, setShowOperationModal] = useState(false), // 是否显示操作模态框
          [operationModalType, setOperationModalType] = useState(''); // 打开模态框的类型

    useEffect(() => {
        // 挂载后从本地储存取数据
        if(todoList.length <= 0) {
            const todoData = JSON.parse(localStorage.getItem("todoData") || "[]");
            setTodoList(todoData);
        }
    }, []);

    useLayoutEffect(() => {
        // 每次todoList发生变化重新写入本地储存
        if (
            localStorage.getItem("todoData") != JSON.stringify(todoList) &&
            todoList.length
        ) {
            localStorage.setItem("todoData", JSON.stringify(todoList));
        }
    }, [todoList]);

    // 添加一条记录
    const addItem = useCallback((value) => {
        const time = Date.now();
        const item = {
            id: time,
            updateTime: time,
            content: value,
            completed: false,
        };
        setTodoList((todoList) => [...todoList, item]); // 添加一条记录
        setIsInputShow(false); // 隐藏输入框
    }, []);

    // 改变当前要查看或编辑的记录
    function changeCurrentItem(id) {
        setCurrentItem(() => todoList.filter((item) => item.id === id)[0]);
    }

    // 打开操作模态框
    function openOperationModal(type, id) {
        setOperationModalType(type);
        changeCurrentItem(id);
        setShowOperationModal(true);
    }

    // 关闭操作模态框
    function closeOperationModal() {
        setShowOperationModal(false);
        setCurrentItem({});
        setOperationModalType('');
    }

    // 点击列表项的查看按钮
    const handleViewItem = useCallback(
        (id) => {
            openOperationModal('view', id);
        },
        [todoList]
    );

    // 点击列表项的编辑按钮
    const handleEditItem = useCallback(
        (id) => {
            openOperationModal('edit', id);
        },
        [todoList]
    );

    // 点击列表项的删除按钮
    const handleDeleteItem = useCallback((id) => {
        openOperationModal('delete', id);
    }, [todoList])

    // 点击checkbox改变状态
    const handleClickCheckbox = useCallback((id) => {
        setTodoList((todoList) =>
            todoList.map((item) => {
                if (item.id === id) item.completed = !item.completed;
                return item;
            })
        );
    }, []);

    // 点击查看弹框里的确定按钮
    const handleClickViewConfirmBtn = useCallback(() => {
        closeOperationModal();
    }, []);

    // 点击编辑弹框里的保存按钮
    const handleClickEditSaveBtn = useCallback((newData, oldId) => {
        if (oldId) {
            setTodoList((todoList) =>
                todoList.map((item) => {
                    if (item.id === oldId) {
                        Object.assign(item, newData);
                    }
                    return item;
                })
            );
            Toast.toast('修改成功', 2000)
        }
        closeOperationModal();
    }, []);

    // 点击删除弹框里的确定按钮
    const handleClickDeleteConfirmBtn = useCallback((id)=> {
        setTodoList(todoList => todoList.filter(item => item.id !== id));
        Toast.toast('删除成功', 2000);
        closeOperationModal();
    }, [])

    // 点击删除弹框里的取消按钮
    const handleClickDeleteCancelBtn = useCallback(()=> {
        closeOperationModal();
    }, [])

    return (
        <div className="App">
            <MyHeader
                isInputShow={isInputShow}
                openInput={() => setIsInputShow(!isInputShow)}
            />
            <AddInput isInputShow={isInputShow} addItem={addItem} />
            <ul
                className="todo-list"
                style={{
                    transform: isInputShow ? "translateY(1.52rem)" : "none",
                }}
            >
                {todoList.length !== 0 &&
                    todoList.map((item) => (
                        <TodoItem
                            item={item}
                            key={item.id}
                            clickViewBtn={handleViewItem}
                            clickEditBtn={handleEditItem}
                            clickDeleteBtn={handleDeleteItem}
                            clickCheckbox={handleClickCheckbox}
                        />
                    ))}
            </ul>
            <OperationModal
                type={operationModalType}
                data={currentItem}
                show={showOperationModal}
                clickViewConfirmBtn={handleClickViewConfirmBtn}
                clickEditSaveBtn={handleClickEditSaveBtn}
                clickDeleteConfirmBtn={handleClickDeleteConfirmBtn}
                clickDeleteCancelBtn={handleClickDeleteCancelBtn}
            />
        </div>
    );
}

export default App;
