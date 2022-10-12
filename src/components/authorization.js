import { authorizationTemplate } from '../templates'
import {
    authLoginCallback,
    authPasswordCallback
} from '../callbacks'

import {
    stylizeButton,
    stylizeMessage,
    getUser,
    hideAuthElements,
    authElems,
    getAuthElems
} from '../helpers'

import sha256 from 'sha256'

export function authorization () {
    const main = document.getElementsByTagName('main')[0]

    main.innerHTML = authorizationTemplate

    getAuthElems()

    authElems.login.oninput = authLoginCallback

    authElems.password.oninput = authPasswordCallback

    authElems.submit.onclick = function(event) {
        event.target.disabled = true

        const test = sha256(authElems.password.value) === localStorage.getItem(authElems.login.value)

        authElems.message.innerText = test ? `Hello ${authElems.login.value}` : 'Invalid password'
        test ? getUser(authElems.login.value)
            .then(response => { authElems.picture.src = response.avatar || null }) : null

        stylizeButton(event.target, test)
        stylizeMessage(authElems.message, test)
        
        hideAuthElements(test)
    }
}
