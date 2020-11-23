import React from 'react';
import Modal from '../Modal';

export default function DeleteItem({ show, data, clickConfirmBtn, clickCancelBtn }) {

    return show ? (
        <Modal>
            <div className="inner">
                <h3 className="m-header" style={{backgroundColor: '#d9534f'}}>确定删除事件？</h3>
                <div className="content-wrapper">
                    <p className="topic">时间： { data.id }</p>
                    <p className="topic content">内容： { data.content }</p>
                    <p className="topic">状态： { data.completed ? '已完成' : '未完成' }</p>
                    <div className="options-group">
                        <button className="btn btn-default cancel-btn" onClick={ clickCancelBtn }>取消</button>
                        <button className="btn btn-danger confirm-btn" onClick={ ()=>clickConfirmBtn(data.id) }>确定</button>
                    </div>
                </div>
            </div>
        </Modal>
    ) : '';
};