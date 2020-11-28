import React, { useEffect, Component } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

// 如果在函数组件中使用createPortal在退出会立即移除，无退场过渡效果，所以改用class组件
export default class Mask extends Component{
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.el.className = "modal-wrapper";
    }
    componentDidUpdate() {
        if(this.props.show) {
            document.body.appendChild(this.el);
            document.body.style.overflow = 'hidden';
        }else {
            let div = document.querySelector('.modal-wrapper');
            if(div) {
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    document.body.removeChild(div);
                }, 200);
            }
        }
    }

    handleClickMask = (e) => {
        if(this.el.querySelector('.modal-mask').className.includes('modal-enter-done')) {
            // 走完进场动画才能点击蒙层
            this.props.clickMask();
        }
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    render() {
        const {show, children} = this.props;
        return ReactDOM.createPortal((
            <>
                <CSSTransition in={show} timeout={300} classNames="modal" appear={true} unmountOnExit>
                    <div className="modal-mask" onClick={this.handleClickMask}></div>
                </CSSTransition>
                <CSSTransition in={show} timeout={300} classNames="operation" appear={true} unmountOnExit>
                    <div className="modal-inner">{children}</div>
                </CSSTransition>
            </>
        ), this.el);
    }
};


// export default function Mask({ children, show, clickMask }) {
//     const el = document.createElement('div');
//     el.className = 'modal-wrapper';
//     useEffect(()=> {
//         if(show) {
//             document.body.appendChild(el);
//             document.body.style.overflow = 'hidden';
//         }else {
//             let div = document.querySelector('.modal-wrapper');
//             if(div) {
//                 document.body.style.overflow = 'auto';
//                 setTimeout(() => {
//                     document.body.removeChild(div);
//                 }, 100);
//             }
//         }
//     }, [show])
//     useEffect(()=>()=>{console.log('Mask destroy');}, [])
//     const onExit = ()=> {
//         console.log('onExit');
//     }
//     return ReactDOM.createPortal((
//             <>
//                 <CSSTransition onExit={onExit} in={show} timeout={300} classNames="modal" appear={true}>
//                     <div className="modal-mask" onClick={(e)=>{ clickMask();e.stopPropagation();e.nativeEvent.stopImmediatePropagation(); }}></div>
//                 </CSSTransition>
//                 <CSSTransition in={show} timeout={300} classNames="operation" appear={true}>
//                     <div className="modal-inner">{children}</div>
//                 </CSSTransition>
//             </>
//     ), el);
// }