import { useState } from 'react'
import { DOMAIN, ACCESS_TOKEN } from '../constants'

const useUsername = () => {
    const [username, setUsername] = useState(null)
    const accessToken = localStorage.getItem(ACCESS_TOKEN)

    const fetchUsername = () => {
        fetch(`${DOMAIN}/api/username/`, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setUsername(data.username)
        })
    }

  return {username, fetchUsername}
}

export default useUsername