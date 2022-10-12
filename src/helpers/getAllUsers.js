import { host } from '../configs/host'

export async function getAllUsers () {
   return await (await fetch(`${host}/users/all`)).json()
}
