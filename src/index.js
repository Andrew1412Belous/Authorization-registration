import { getAllUsers, addElem } from './helpers'
import {
    authorization,
    registration
} from './components'

getAllUsers()
    .then(users => Object.keys(users)
        .forEach(key => localStorage.setItem(key, users[key].password)))

window[Symbol.for('elems')] = {}

addElem('main')

;['registration-btn', 'authorization-btn']
    .map(btn => document.getElementById(btn))
    .forEach(item => {
        item.onclick = function(event) {
            event.target.id === 'registration-btn' ? registration() : authorization()
        }
    })
