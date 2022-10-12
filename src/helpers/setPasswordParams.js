import { regElems, authElems } from "./elems-handler";

export function setPasswordParams (mode, color, disabled) {
    const elems = mode === 'auth' ? authElems : regElems

    elems.password.disabled = disabled
    elems.login.style.color = color
}
