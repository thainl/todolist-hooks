import React, { useRef } from 'react';
import Modal from '../Modal';

export default function EditItem({ show, data, clickSaveBtn }) {
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
                <h3 className="m-header">编辑事件</h3>
                <div className="content-wrapper">
                    <p className="topic">时间： { data.id }</p>
                    <p className="topic">内容：<textarea defaultValue={data.content} className="text-area" ref={inputRef}></textarea></p>
                    <p className="topic">状态： <input ref={checkboxRef} className="check-box" type="checkbox" defaultValue={data.completed} /></p>
                    <button className="btn btn-primary confirm-btn" onClick={ submitSave }>保存</button>
                </div>
            </div>
        </Modal>
    ) : '';
};