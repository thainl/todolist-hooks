function getTextWidth (text, fontSize='0.64rem') {
    const el = document.createElement('span'),
          oContent = document.querySelector('.todo-item .content'),
          rootFZ = parseFloat(window.getComputedStyle(document.documentElement, null)['fontSize']);
    el.innerText = text;
    el.style.opacity = '0';
    el.style.fontSize = fontSize;
    el.style.position = 'absolute';
    document.body.appendChild(el);
    let width = 0;
    if(oContent) {
        width = el.offsetWidth > oContent.offsetWidth ? oContent.offsetWidth - (10.5 * (rootFZ / 25)) : el.offsetWidth;
    }else {
        width = el.offsetWidth;
    }
    document.body.removeChild(el);
    return width / rootFZ + 'rem';
}

export {
    getTextWidth
};