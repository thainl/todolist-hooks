import React from 'react';
import Modal from '../Modal';
import '../../assets/style/common.scss';

export default function ViewItem({ show, data, clickConfirmBtn }) {

    return show ? (
        <Modal>
            <div className="inner">
                <h3 className="m-header">查看事件</h3>
                <div className="content-wrapper">
                    <p className="topic">时间： { data.id }</p>
                    <p className="topic">内容： { data.content }</p>
                    <p className="topic">状态： { data.completed ? '已完成' : '未完成' }</p>
                    <button className="btn btn-primary confirm-btn" onClick={ clickConfirmBtn }>确定</button>
                </div>
            </div>
        </Modal>
    ) : '';
};