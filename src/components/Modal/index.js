import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'

export default function Modal({ children }) {
    const el = document.createElement('div');
    el.className = 'modal';
    useEffect(()=> {
        console.log('show modal');
        document.body.appendChild(el);
        document.body.style.overflow = 'hidden';
        return ()=> {
            console.log('remove modal');
            document.body.removeChild(el);
            document.body.style.overflow = 'auto';
        };
    }, [])
    return ReactDOM.createPortal(children, el);
};