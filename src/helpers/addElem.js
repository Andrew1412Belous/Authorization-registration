export function addElem (tagName, container = document.body) {
    return container.nodeType === 1
            ? container.appendChild(document.createElement(tagName)) 
            : null
} 
