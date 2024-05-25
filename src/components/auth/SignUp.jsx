import { useState } from 'react'
import { DOMAIN, ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants'

const SignUp = ({handleAuthentication, navigatePath}) => {
    const [inputData, setInputData] = useState({username: '', password: '', email: ''})

    const logIn = (username, password) => {
        const data = {
            username: username,
            password: password,
        }
        fetch(`${DOMAIN}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then((data) => {
            console.log(data)
            localStorage.setItem(ACCESS_TOKEN, data.access)
            localStorage.setItem(REFRESH_TOKEN, data.refresh)
            handleAuthentication()
            navigate(navigatePath)
        }) 
        .catch(err => console.log(err))
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const response = await fetch(`${DOMAIN}/api/signup/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputData),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            console.log(data)
            logIn(inputData.username, inputData.password)
            setInputData({username: '', password: '', email: ''})
        } catch (err) {
            console.log(err)
        }
    }

    const handleUsernameChange = e => {
        setInputData((prev) => {
            let newData = {...prev}
            newData.username = e.target.value 
            return newData
        })
    }
    const handlePasswordChange = e => {
        setInputData((prev) => {
            let newData = {...prev}
            newData.password = e.target.value 
            return newData
        })
    }
    const handleEmailChange = e => {
        setInputData((prev) => {
            let newData = {...prev}
            newData.email = e.target.value 
            return newData
        })
    }

    return (
        <div className='flex flex-col text-black dark:text-slate-200'>
            <h2 className='text-2xl font-montserrat mb-6 text-center'>CREATE ACCOUNT</h2>
            <form className='flex flex-col gap-4 text-end'>
                <div className='login-div'>
                    <label className=' font-montserrat font-light' htmlFor="signUpUsername">Username: </label>
                    <input className='bg-zinc-100/30 dark:text-zinc-200 px-1' type="text" id='signUpUsername' value={inputData['username']} onChange={handleUsernameChange} />
                </div>
                <div className='login-div'>
                    <label className=' font-montserrat font-light' htmlFor="email">Email: </label>
                    <input className='bg-zinc-100/30 dark:text-zinc-200 px-1' type="text" id='email' value={inputData['email']} onChange={handleEmailChange} />
                </div>
                <div className='login-div'>
                    <label className=' font-montserrat font-light' htmlFor="signUpPassword">Password: </label>
                    <input className='bg-zinc-100/30 dark:text-zinc-200 px-1' type="password" id='signUpPassword' value={inputData['password']} onChange={handlePasswordChange} />
                </div>
                <div className='flex justify-center'>
                    <button className=' bg-slate-200 w-fit py-2 px-4 text-black font-montserrat font-light text-sm rounded-md ring-2 ring-slate-400' type='submit' onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp