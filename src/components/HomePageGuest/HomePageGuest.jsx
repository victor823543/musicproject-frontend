import '../../App.css'
import image_dark_piano from '../../assets/images/dark_grand.jpeg'
import image_white_grand from '../../assets/images/white_grand.jpeg'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StartSection from './StartSection'
import CreateIntroduction from './IntroStep1.jsx/CreateIntroduction'
import ProgressBorder from './components/ProgressBorder'

const HomePageGuest = (props) => {
    const navigate = useNavigate()
    const [showLoginPage, setShowLoginPage] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowSignup] = useState(false)
    const [showStart, setShowStart] = useState(true)
    const [showIntro, setShowIntro] = useState(false)
    const [current, setCurrent] = useState(1)

    useEffect(() => {
        props.refreshAuthentication()
    }, [])
    
    useEffect(() => {

            window.scrollTo({
                top: window.scrollY + 1000,
                behavior: 'smooth',
            })
        

    }, [showLoginPage])


    const handleCreateClick = () => {
        setShowLogin(false)
        setShowSignup(true)
    }

    const handleLoginClick = () => {
        setShowSignup(false)
        setShowLogin(true)
    }

    const handleLogOrCreateClick = () => {
        setShowLoginPage(true)
        setShowSignup(true)
    }

    const handleGuestClick = () => {
        navigate('/music')
    }

    const handleScreenClick = () => {
        if (clickToProgressSteps.includes(current)) {
            setCurrent(current + 1)
        }
    }

    const clickToProgressSteps = [6]


    return (
        <div onClick={showIntro ? handleScreenClick : undefined} className={`hideScrollbar h-screen ${showIntro && 'flex flex-col justify-center pt-20 pb-3 items-center'}`} >
            <div className={`flex flex-col justify-center max-sm:items-center ${!showIntro ? 'h-full' : ''}`}>
                <div style={{backgroundImage: `url(${image_white_grand})`}} className='dark:hidden fixed bg-cover inset-0 bg-center -z-20'></div>
                <div style={{backgroundImage: `url(${image_dark_piano})`}} className='dark:block hidden fixed bg-cover inset-0 bg-center -z-20'></div>
                <div className='dark:hidden fixed bg-cover inset-0 -z-10 bg-sky-300/10'></div>
                <AnimatePresence>
                    {
                        showStart &&
                        <StartSection key='start' handleGuestClick={handleGuestClick} handleLogOrCreateClick={handleLogOrCreateClick} handleIntroClick={() => setShowIntro(true)} disableStart={() => setShowStart(false)}/>
                    }
                </AnimatePresence>

            </div>    
                
            {showLoginPage && 
                <div  className={`flex flex-col justify-center items-center gap-4 py-20 h-full text-black dark:text-slate-200 text-center`}>
                    <motion.div 
                        className='flex flex-col justify-center items-center gap-4 bg-gradient-to-br from-sky-200/50 to-sky-400/50 dark:from-black dark:to-sky-400/80 backdrop-blur-sm px-10 py-16 shadow-2xl rounded-md'
                        
                    >
                        {showLogin && props.children[0]}
                        {showSignup && props.children[1]}
                        {showLogin ? (
                            <>
                            <p className=' font-montserrat font-light'>Not yet an account?</p>
                            <button className='btn-w' onClick={handleCreateClick}>Create Account</button>
                            </>
                        ) : (
                            <>
                            <p className=' font-montserrat font-light'>Already have an account?</p>
                            <button className='btn-w' onClick={handleLoginClick}>Log in</button>
                            </>
                        )}
                        
                        <p className=' font-montserrat font-light'>Just want to test out the site?</p>
                        <button className='btn-w' onClick={handleGuestClick}>Continue as Guest</button>
                    </motion.div>
                    
                </div>
            }

            {showIntro && <>
                
                <div className='relative bg-slate-100 dark:bg-slate-950 rounded-lg w-[95vw] shadow-md overflow-hidden'>
                    <ProgressBorder currentStep={current} />
                    <div className='w-full h-full overflow-scroll hideScrollbar'>
                        <CreateIntroduction currentStep={current} nextStep={() => setCurrent(current+1)} />
                    </div>
                    
                </div>
            </>}
                

                
            
        </div>
        
    )
}

export default HomePageGuest