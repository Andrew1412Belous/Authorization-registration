import  { regElems } from "./elems-handler";

export function readImage (file) {
    if (!file.type.indexOf('image')) {

        regElems.message.innerText = ''
        
        const reader = new FileReader

        reader.onload = function (ev) {
            regElems.picture.src = ev.target.result
        }

        reader.readAsDataURL(file)
    } else {
        regElems.message.innerText = 'Invalid type file'
    }
}
