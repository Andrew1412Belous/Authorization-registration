export const regElems = {}
export const authElems = {}

export const getAuthElems = () => Object.assign(authElems, ['registration-form', 'login', 'password', 'submit', 'message', 'picture']
    .map(id => ( { [id]: document.getElementById(id)}))
    .reduce((result, link) => Object.assign(result, link), {}))

export const getRegElems = () => Object.assign(regElems, ['registration-form', 'login', 'password', 'avatar', 'message', 'picture', 'submit']
    .map(id => ({ [id]: document.getElementById(id) }))
    .reduce((result, link) => Object.assign(result, link), {}))
