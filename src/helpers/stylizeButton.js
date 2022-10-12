export function stylizeButton (elem, test) {
    const border = test ? 'solid #090 2px' : 'solid #b00 2px'
    const color = test ? '#090' : '#b00'
    Object.assign(elem.style, { border, color })
}