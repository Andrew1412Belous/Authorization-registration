import { setPasswordParams } from '../helpers'

export function authLoginCallback (event) {
    localStorage.getItem(event.target.value)
        ? setPasswordParams('auth', '#090', false)
        : setPasswordParams('auth', '#b00', true)
}
