import { authElems } from "./elems-handler";

export function hideAuthElements (test) {
    const display = test ? 'none' : 'block'

    authElems.login.style.display = display
    authElems.password.style.display = display
    authElems.submit.style.display = display
}