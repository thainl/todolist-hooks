import React, { useEffect, useState } from "react";
import { Transition } from "react-transition-group";

export default function ToastWrapper({ children, duration, onClose }) {
    const [show, setShow] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setShow(false);
            typeof onClose === "function" && onClose();
        }, duration + 300);
    }, []);

    const defaultStyle = {
        transition: `all 300ms`,
        opacity: "0",
        transform: "scale(0.6)",
    };

    const transitionStyle = {
        entering: { opacity: "0", transform: "scale(0.6)" },
        entered: { opacity: "1", transform: "scale(1)" },
        exiting: { opacity: "0", transform: "scale(0.6)" },
        exited: { opacity: "0", transform: "scale(0.6)" },
    };

    return (
        <Transition
            in={show}
            unmountOnExit
            appear={true}
            timeout={300}
        >
            {(state) => (
                <div
                    className="toast"
                    style={{ ...defaultStyle, ...transitionStyle[state] }}
                >
                    {children}
                </div>
            )}
        </Transition>
    );
}
