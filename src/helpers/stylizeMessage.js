export function stylizeMessage (elem, test) {
    const color = test ? '#090' : '#b00'
    Object.assign(elem.style, { color })
}