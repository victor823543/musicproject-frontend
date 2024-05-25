import {useState} from 'react'
import LogIn from './LogIn'
import SignUp from './SignUp'

const LoginModal = ({handleAuthentication, navigate, start='login'}) => {
  const [display, setDisplay] = useState(start)
  return (
    <div className='fixed inset-0 cover bg-slate-700/40 flex flex-col justify-center items-center dark:text-sky-200/80'>
        <div className='bg-zinc-200 dark:bg-slate-950 p-20 flex flex-col gap-6 items-center rounded-xl shadow-xl'>
            {display==='login' &&
              <LogIn handleAuthentication={handleAuthentication} navigatePath={navigate}/> 
            }
            {display==='signup' &&
              <SignUp handleAuthentication={handleAuthentication} navigatePath={navigate}/> 
            }
            <p className='text-2xl dark:text-slate-200 font-montserrat'>{display === 'login' ? "Don't have an account?" : 'Already have an account?'}</p>
            <button className='btn-s' onClick={() => setDisplay(display === 'login' ? 'signup' : 'login')}>{display === 'login' ? 'SIGN UP' : 'LOG IN'}</button>
            
        </div>
    </div>
  )
}

export default LoginModal