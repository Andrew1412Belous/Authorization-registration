import { host } from '../configs/host'

export async function getUser (login) {
    return await (await fetch(`${host}/user/${login}`)).json()
}
