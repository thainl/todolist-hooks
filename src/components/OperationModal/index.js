import React, { useEffect, useRef } from "react";
import Modal from "../Modal";

export default function OperationModal({
    type,
    show,
    data,
    clickViewConfirmBtn,
    clickDeleteConfirmBtn,
    clickDeleteCancelBtn,
    clickEditSaveBtn,
}) {
    const deleteType = type === "delete",
        editType = type === "edit",
        inputRef = useRef(),
        checkboxRef = useRef();
    
    useEffect(()=> {
        if(editType && inputRef.current) {
            inputRef.current.value = data.content;
            inputRef.current.focus();
        }
    }, [type])

    function submitSave() {
        const val = inputRef.current.value.trim();
        if (val.length === 0) {
            inputRef.current.value = data.content;
            return;
        }
        if (
            data.content === val &&
            data.completed === checkboxRef.current.checked
        ) {
            clickEditSaveBtn({}, null);
        } else {
            const newData = {
                id: Date.now(),
                content: val,
                completed: checkboxRef.current.checked,
            };
            clickEditSaveBtn(newData, data.id);
        }
    }
    return show ? (
        <Modal>
            <div className="inner">
                <h3
                    className="m-header"
                    style={{ backgroundColor: deleteType ? "#e8993e" : "" }}
                >
                    {deleteType
                        ? "确定删除事件？"
                        : (editType ? "编辑" : "查看") + "事件"}
                </h3>
                <div className="content-wrapper">
                    <p className="topic">时间： {data.id}</p>
                    <p className="topic content">
                        内容：{" "}
                        {editType ? (
                            <textarea
                                className="text-area"
                                ref={inputRef}
                            ></textarea>
                        ) : (
                            data.content
                        )}
                    </p>
                    <p className="topic">
                        状态：{" "}
                        {editType ? (
                            <input
                                ref={checkboxRef}
                                className="check-box"
                                type="checkbox"
                                defaultChecked={data.completed}
                            />
                        ) : data.completed ? (
                            "已完成"
                        ) : (
                            "未完成"
                        )}
                    </p>
                    <div className="options-group">
                        {deleteType && (
                            <button
                                className="btn btn-default cancel-btn"
                                onClick={clickDeleteCancelBtn}
                            >
                                取消
                            </button>
                        )}
                        <button
                            className={"btn confirm-btn " + (deleteType ? 'btn-danger' : 'btn-primary')}
                            onClick={() =>
                                deleteType
                                    ? clickDeleteConfirmBtn(data.id)
                                    : editType
                                    ? submitSave()
                                    : clickViewConfirmBtn(data.id)
                            }
                        >
                            {deleteType ? '删除' : editType ? '保存' : '确定'}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    ) : (
        ""
    );
}