import React, { Component } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

// 如果在函数组件中使用createPortal在退出会立即移除，无退场过渡效果，所以改用class组件
export default class Mask extends Component {
    constructor(props) {
        super(props);
        // 接收的参数
        // show： 显示与否
        // clickMask：点击蒙层的操作
        // unmountOnHide: 关闭时是否卸载组件
        // onClosed: 关闭后的回调
        this.el = document.createElement("div");
        this.el.className = "modal-wrapper";
    }
    componentDidUpdate() {
        if (this.props.show) {
            // 打开
            if (this.props.unmountOnHide) {
                // 如果关闭后卸载组件，则每次打开时都要重新追加dom
                document.body.appendChild(this.el);
            } else {
                !document.querySelector(".modal-wrapper") &&
                    document.body.appendChild(this.el);
                this.el.style.display = "flex";
            }
            document.body.style.overflow = "hidden";
        }
    }

    // 过渡退场时的回调
    onExited = () => {
        let oModal = document.querySelector(".modal-wrapper");
        if (this.props.unmountOnHide) {
            if (oModal) document.body.removeChild(oModal);
        } else {
            // 如果关闭后不卸载组件，在把dom隐藏不显示即可
            oModal.style.display = "none";
        }
        document.body.style.overflow = "auto";
        typeof this.props.onClosed === 'function' && this.props.onClosed();
    };

    handleClickMask = (e) => {
        if (
            this.el
                .querySelector(".modal-mask")
                .className.includes("modal-enter-done") &&
            typeof this.props.clickMask === "function"
        ) {
            // 走完进场动画才能点击蒙层
            this.props.clickMask();
        }
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };

    render() {
        const { show, children } = this.props;
        return ReactDOM.createPortal(
            <>
                <CSSTransition
                    in={show}
                    timeout={300}
                    classNames="modal"
                    appear={true}
                    unmountOnExit={this.props.unmountOnHide ? true : false}
                >
                    <div
                        className="modal-mask"
                        onClick={this.handleClickMask}
                    ></div>
                </CSSTransition>
                <CSSTransition
                    onExited={this.onExited}
                    in={show}
                    timeout={300}
                    classNames="operation"
                    appear={true}
                    unmountOnExit={this.props.unmountOnHide ? true : false}
                >
                    <div className="modal-inner">{children}</div>
                </CSSTransition>
            </>,
            this.el
        );
    }
}

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
