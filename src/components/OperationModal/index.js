import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "../../libs/utils";
import Checkbox from "../Checkbox";
import Mask from "../Mask";


export default function OperationModal({
    type,
    show,
    data,
    closeModal,
    clickViewConfirmBtn,
    clickDeleteConfirmBtn,
    clickDeleteCancelBtn,
    clickEditSaveBtn,
    onClosed
}) {
    const deleteType = type === "delete",
          editType = type === "edit",
          inputRef = useRef(),
          checkboxRef = useRef();

    useEffect(() => {
        if (editType && inputRef.current) {
            inputRef.current.value = data.content;
            inputRef.current.focus();
        }
        !maskClickable && setMaskClickable(true);
    }, [show]);

    // 在编辑状态下，改变了内容禁用点击mask关闭modal
    const [maskClickable, setMaskClickable] = useState(true);
    const onBlur = (e) => {
        if(e.target.value === data.content) {
            !maskClickable && setMaskClickable(true);
        }else {
            maskClickable && setMaskClickable(false);
        }
    }

    function submitSave() {
        const val = inputRef.current.value.trim();
        if (val.length === 0) {
            inputRef.current.value = data.content;
            return;
        }
        if (data.content === val) {
            if (data.completed === checkboxRef.current.checked) {
                // 内容无更改
                clickEditSaveBtn({}, null);
            } else {
                // 更改了状态
                clickEditSaveBtn(
                    { completed: checkboxRef.current.checked },
                    data.id
                );
            }
        } else {
            // 更改了content
            const newData = {
                updateTime: Date.now(),
                content: val,
                completed: checkboxRef.current.checked,
            };
            clickEditSaveBtn(newData, data.id);
        }
    }

    return (
        <Mask show={show} clickMask={ maskClickable ? closeModal : null } unmountOnHide={false} onClosed={onClosed}>
            <div className="inner">
                <span className="close" onClick={()=>closeModal()}>&#43;</span>
                <h3
                    className="m-header"
                    style={{
                        backgroundColor: deleteType ? "#d9534f" : "",
                    }}
                >
                    {deleteType
                        ? "确定删除事件？"
                        : (editType ? "编辑" : "查看") + "事件"}
                </h3>
                <div className="content-wrapper">
                    <p className="topic">
                        时间： {formatDate(data.updateTime)}
                    </p>
                    <p className="topic content">
                        内容：{" "}
                        {editType ? (
                            <textarea
                                className="text-area"
                                ref={inputRef}
                                onBlur={onBlur}
                            ></textarea>
                        ) : (
                            data.content
                        )}
                    </p>
                    <p className="topic">
                        状态：{" "}
                        {editType ? (
                            <Checkbox
                                ref={checkboxRef}
                                checked={data.completed}
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
                                onClick={()=>clickDeleteCancelBtn()}
                            >
                                取消
                            </button>
                        )}
                        <button
                            className={
                                "btn confirm-btn " +
                                (deleteType ? "btn-danger" : "btn-primary")
                            }
                            onClick={() =>
                                deleteType
                                    ? clickDeleteConfirmBtn(data.id)
                                    : editType
                                    ? submitSave()
                                    : clickViewConfirmBtn(data.id)
                            }
                        >
                            {deleteType ? "删除" : editType ? "保存" : "确定"}
                        </button>
                    </div>
                </div>
            </div>
        </Mask>
    );
}
