import { setPasswordParams } from '../helpers'

export function registrationLoginCallback (event) {
    localStorage.getItem(event.target.value)
        ? setPasswordParams('reg', '#d00', true)
        : setPasswordParams('reg', '#090', false)
}
