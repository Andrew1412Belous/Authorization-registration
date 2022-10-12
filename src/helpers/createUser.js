import { host } from '../configs/host'

export async function createUser (id, user) {
    return await(await fetch(`${host}/user/${id}`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(user) 
        })).json()
}
