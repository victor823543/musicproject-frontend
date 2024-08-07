import { useState } from 'react'
import { Link } from 'react-router-dom'
import ToggleTheme from './ToggleTheme'
import HamburgerIcon from '../../assets/icons/burger-menu.svg'
import HamburgerWhiteIcon from '../../assets/icons/burger-menu-white.svg'
import CloseButton from '../../assets/icons/close-button.svg'
import CloseButtonWhite from '../../assets/icons/close-button-white.svg'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const SideBar = ({isOpen, closeSidebar, navObject, isAuthenticated, logout, themeComponent}) => {
    const navigate = useNavigate()
    const handleLoginClick = () => {
        closeSidebar()
        navigate('/login')
    }
    return (
        <motion.div className={`fixed inset-y-0 right-0 rounded-bl-lg bg-zinc-100 dark:bg-black w-64 h-fit p-4 z-[100]`}
            initial={{x: '100%'}}
            animate={{x: 0}}
            exit={{x: '100%'}}
            transition={{duration: 0.15, type: 'tween', ease: 'easeIn'}}
        >
            <ul className=' flex flex-col gap-6'>
                {Object.entries(navObject).map(([name, route], index) =>
                    <motion.li key={index}
                        initial={{x: 30}}
                        animate={{x: 0}}
                        transition={{delay: (index * 0.05) + 0.1, type: 'spring', duration: 0.5}}
                    >
                        <Link to={route} onClick={closeSidebar} className=' text-gray-700 dark:text-gray-200 hover:text-sky-800 dark:hover:text-sky-400 font-sans text-xl'>{name}</Link>
                    </motion.li>
                )}
                {isAuthenticated ? 
                    <button onClick={logout} className='bg-slate-200 px-4 py-2 text-sm font-light rounded-lg ring-1 ring-slate-400 '>Log Out</button>
                    :
                    <button onClick={handleLoginClick} className='bg-slate-200 px-4 py-2 text-sm font-light rounded-lg ring-1 ring-slate-400'>Log In</button>
                }
                <div>{themeComponent}</div>
            </ul>
            <div onClick={closeSidebar} className='absolute top-2 right-2'>
                <img src={CloseButton} alt="Close" width={50} height={50} className='dark:hidden' />
                <img src={CloseButtonWhite} alt="Close" width={50} height={50} className='hidden dark:block'/>
            </div>
            
        </motion.div>
    )
}

const NavBar = (props) => {
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [lightMode, setLightMode] = useState(() => {
        const storedLightMode = localStorage.getItem('lightMode')
        return (storedLightMode === 'true')
    })

    const toggleDarkMode = () => {
        localStorage.setItem('lightMode', !lightMode)
        if (lightMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        setLightMode(prev => !prev)
    }

    const navItems = {'Home': '/', 'Create music': '/music', 'Ear Training': '/eartraining'}

    return (
        <header className='fixed w-full py-5 px-4 z-[100] bg-zinc-100/60 dark:bg-black/40 backdrop-blur-sm'>
            <nav className='flex justify-between items-center'>
                <a href="/" className=' font-montserrat font-bold text-xl dark:text-sky-300'>LearnMusic</a>
                <ul className='flex justify-center items-center gap-12 max-lg:hidden'>
                    {Object.entries(navItems).map(([name, route], index) => 
                            <li key={index}>
                                <Link to={route} className=' text-gray-700 dark:text-gray-200 hover:text-sky-800 dark:hover:text-sky-400 font-montserrat font-light text-lg'>{name}</Link>
                            </li>
                        )}
                </ul>
                <div className='flex gap-2 items-center max-lg:hidden'>
                    <div><ToggleTheme mode={lightMode} toggle={toggleDarkMode}/></div>
                    {props.isAuthenticated ? 
                        <button onClick={props.logout} className='bg-slate-200 px-4 py-2 text-sm font-light rounded-lg ring-1 ring-slate-400 max-lg:hidden'>Log Out</button>
                        :
                        <button onClick={() => navigate('/login')} className='bg-slate-200 px-4 py-2 text-sm font-light rounded-lg ring-1 ring-slate-400 max-lg:hidden'>Log In</button>
                    }
                </div>
                
                
                <div onClick={() => setSidebarOpen(true)} className='lg:hidden'>
                    <img src={HamburgerIcon} alt="Icon" width={30} height={30} className='dark:hidden'/>
                    <img src={HamburgerWhiteIcon} alt="Icon" width={30} height={30} className='hidden dark:block'/>
                </div>

            </nav>
            <AnimatePresence>
            {sidebarOpen &&    
                <SideBar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} navObject={navItems} isAuthenticated={props.isAuthenticated} logout={props.logout} themeComponent={<ToggleTheme mode={lightMode} toggle={toggleDarkMode}/>} /> 
            }
            </AnimatePresence>
        </header>
    )
}

export default NavBar