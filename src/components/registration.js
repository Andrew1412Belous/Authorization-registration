import { registrationTemplate } from '../templates'
import {
    registrationLoginCallback,
    registrationPasswordCallback
} from '../callbacks'
 
 import {
    readImage,
    createUser,
    getRegElems,
    regElems
} from '../helpers'

import sha256 from 'sha256'

export function registration () {
    const main = document.getElementsByTagName('main')[0]

    main.innerHTML = registrationTemplate

    getRegElems()
        
    regElems.login.oninput = registrationLoginCallback
    
    regElems.password.oninput = registrationPasswordCallback
    
    regElems.avatar.onchange = function (event) {
        readImage(event.target.files[0])
    }
    
    regElems.submit.onclick = function (event) {
        const password = sha256(regElems.password.value)

        event.target.style.color = '#090'  

        Object.keys(regElems)
            .forEach(key => Object.assign(regElems[key], { disabled: true }))
            
        createUser(regElems.login.value, {
            password,
            avatar: regElems.picture.src
        })
            .then(() => {
                localStorage.setItem(regElems.login.value, password)
                regElems['registration-form'].remove()
            })
    }
}
