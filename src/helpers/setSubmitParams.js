import { regElems, authElems } from "./elems-handler";

export function setSubmitParams (mode, color, disabled) {
    const elems = mode === 'auth' ? authElems : regElems

    elems.submit.disabled = disabled
    elems.password.style.color = color
}
