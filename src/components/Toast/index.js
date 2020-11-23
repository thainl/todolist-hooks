import React from "react";
import reactDOM from "react-dom";
import ToastWrapper from "./Wrapper";
import "./index.scss";

export default {
    toast(content, duration = 2000, onClose) {
        if (content.length === 0) throw new Error("content值必须要有效");
        const div = document.createElement("div");
        document.body.appendChild(div);
        setTimeout(() => {
            document.body.removeChild(div);
        }, duration + 800);
        const dom = (
            <ToastWrapper duration={duration} onClose={onClose}>
                {content}
            </ToastWrapper>
        );
        reactDOM.render(dom, div);
    },
};
