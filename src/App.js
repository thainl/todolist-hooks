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
import ViewItem from "./components/ViewItem";
import EditItem from "./components/EditItem";
import DeleteItem from "./components/DeleteItem";
import Toast from './components/Toast';

function App() {
    const [isInputShow, setIsInputShow] = useState(false),
        [todoList, setTodoList] = useState([]),
        [currentItem, setCurrentItem] = useState({}),
        [showViewModal, setShowViewModal] = useState(false),
        [showEditModal, setShowEditModal] = useState(false),
        [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        // 挂载后从本地储存取数据
        const todoData = JSON.parse(localStorage.getItem("todoData") || "[]");
        setTodoList(todoData);
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
        const item = {
            id: Date.now(),
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

    // 点击列表项的查看按钮
    const handleViewItem = useCallback(
        (id) => {
            changeCurrentItem(id);
            setShowViewModal(true);
        },
        [todoList]
    );

    // 点击列表项的编辑按钮
    const handleEditItem = useCallback(
        (id) => {
            changeCurrentItem(id);
            setShowEditModal(true);
        },
        [todoList]
    );

    // 点击checkbox改变状态
    const handleClickCheckbox = useCallback((id) => {
        setTodoList((todoList) =>
            todoList.map((item) => {
                if (item.id === id) item.completed = !item.completed;
                return item;
            })
        );
    }, []);

    // 点击列表项的删除按钮
    const handleDeleteItem = useCallback((id) => {
        changeCurrentItem(id);
        setShowDeleteModal(true);
    }, [todoList])

    // 点击查看弹框里的确定按钮
    const handleClickConfirmBtn = useCallback(() => {
        setShowViewModal(false);
        setCurrentItem({});
    }, []);

    // 点击编辑弹框里的保存按钮
    const handleClickSaveBtn = useCallback((newData, oldId) => {
        if (oldId) {
            setTodoList((todoList) =>
                todoList.map((item) => {
                    if (item.id === oldId) {
                        item = newData;
                    }
                    return item;
                })
            );
            Toast.toast('修改成功', 2000)
        }
        setShowEditModal(false);
        setCurrentItem({});
    }, []);

    // 点击删除弹框里的确定按钮
    const handleClickConfirmDeleteBtn = useCallback((id)=> {
        setTodoList(todoList => todoList.filter(item => item.id !== id));
        setShowDeleteModal(false);
        Toast.toast('删除成功', 2000);
        setCurrentItem({});
    }, [])

    // 点击删除弹框里的取消按钮
    const handleClickCancelDeleteBtn = useCallback(()=> {
        setShowDeleteModal(false);
        setCurrentItem({});
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
            <ViewItem
                data={currentItem}
                show={showViewModal}
                clickConfirmBtn={handleClickConfirmBtn}
            />
            <EditItem
                data={currentItem}
                show={showEditModal}
                clickSaveBtn={handleClickSaveBtn}
            />
            <DeleteItem 
                data={currentItem}
                show={showDeleteModal}
                clickConfirmBtn={handleClickConfirmDeleteBtn}
                clickCancelBtn={handleClickCancelDeleteBtn}
            />
        </div>
    );
}

export default App;
