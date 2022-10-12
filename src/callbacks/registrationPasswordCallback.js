import { setSubmitParams } from '../helpers'

export function registrationPasswordCallback (event) {
    event.target.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
        ? setSubmitParams('reg', '#090', false)
        : setSubmitParams('reg', '#d00', true)
}
