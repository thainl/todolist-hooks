import React, {useRef} from "react";
import Modal from "../Modal";

export default function DeleteItem({
    type,
    show,
    data,
    clickViewConfirmBtn,
    clickDeleteConfirmBtn,
    clickCancelBtn,
    clickSaveBtn
}) {
    const deleteType = type === 'delete',
          editType = type === 'edit';
    const inputRef = useRef(),
          checkboxRef = useRef();
    function submitSave() {
        const val = inputRef.current.value.trim();
        if(val.length === 0) {
            inputRef.current.value = data.content;
            return;
        }
        if(data.content === val && data.completed === checkboxRef.current.checked) {
            clickSaveBtn({}, null);
        }else {
            const newData = {
                id: Date.now(),
                content: val,
                completed: checkboxRef.current.checked
            }
            clickSaveBtn(newData, data.id);
        }
    }
    return show ? (
        <Modal>
            <div className="inner">
                <h3 className="m-header" style={{ backgroundColor: deleteType ? "#d9534f" : '' }}>
                    { deleteType ? '确定删除事件？' : (editType ? '编辑' : '查看')+ '事件' }
                </h3>
                <div className="content-wrapper">
                    <p className="topic">时间： {data.id}</p>
                    <p className="topic content">内容： { editType ? <textarea defaultValue={data.content} className="text-area" ref={inputRef}></textarea> : data.content}</p>
                    <p className="topic">
                        状态： { editType ? <input ref={checkboxRef} className="check-box" type="checkbox" defaultChecked={data.completed} /> : (data.completed ? "已完成" : "未完成")}
                    </p>
                    <div className="options-group">
                        {    
                            deleteType && <button
                                className="btn btn-default cancel-btn"
                                onClick={clickCancelBtn}
                            >
                                取消
                            </button>
                        }
                        <button
                            className="btn btn-danger confirm-btn"
                            onClick={() =>
                                deleteType ? clickDeleteConfirmBtn(data.id) : (editType ? submitSave() : clickViewConfirmBtn(data.id))
                            }
                        >
                            确定
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    ) : (
        ""
    );
}
