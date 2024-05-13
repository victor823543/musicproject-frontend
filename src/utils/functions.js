import { DOMAIN, ACCESS_TOKEN } from "../constants"

export const fetchUpdateProgress = (type) => {

    const url = new URL(`${DOMAIN}/api/${type}/progress/update/`)
    const token = localStorage.getItem(ACCESS_TOKEN)

    fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => 
            console.log(response)
        )
    .catch(error => console.error('Error:', error))
}