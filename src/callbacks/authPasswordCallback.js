import { setSubmitParams } from '../helpers'

export function authPasswordCallback (event) {
    event.target.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
        ? setSubmitParams('auth', '#090', false)
        : setSubmitParams('auth', '#b00', true)
}
