import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import useAuthentication from "../../hooks/useAuthentication"
import LoginModal from '../auth/LoginModal'
import StartingSection from "./components/StartingSection"

const EarTrainingHome = () => {
    const { isAuthenticated, loading, refreshAuthentication } = useAuthentication()
    const navigate = useNavigate()
    const [selected, setSelected] = useState(0)
    const [displayLogin, setDisplayLogin] = useState(false)
    const [rememberedRoute, setRememberedRoute] = useState('')
    const [hideContent, setHideContent] = useState(false)


    useEffect(() => {
        const handleResize = () => {
          // Update shouldAnimate based on screen width
          if (640 < window.innerWidth && window.innerWidth < 1024) {
            setHideContent(true);
          } else {
            setHideContent(false);
          }
        };
    
        // Initial check
        handleResize();
    
        // Listen to window resize events
        window.addEventListener('resize', handleResize);
    
        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseOver = (section) => {
        setSelected(section)
    }

    const handleProgressClick = (route) => {
        if (isAuthenticated) {
            navigate(route)
        } else {
            setRememberedRoute(route)
            setDisplayLogin(true)
        }
    }

  return (
    <div className=" flex-col w-full h-screen max-sm:h-auto  hideScrollbar">
        <div className="fixed inset-0 bg-cover bg-gradient-to-r from-zinc-200 to-teal-600/10 dark:from-slate-900 dark:to-cyan-900 -z-50"></div>
        <div className={`pt-20 flex max-sm:flex-col w-full max-sm:h-auto sm:h-full justify-center sm:overflow-hidden`}>
            <StartingSection 
                isSelected={selected === 0}
                setSelected={() => setSelected(0)}
                hideContent={hideContent}
                handleProgressClick={handleProgressClick}
                colors='text-blue-950 dark:text-blue-300 from-blue-600/50 to-blue-300/50'
                btnColors='bg-blue-200/60 ring-blue-800 dark:bg-blue-950 dark:ring-blue-500'
                path='/eartraining/intervals'
                progressionPath='/eartraining/intervals/progress-mode'
                text={{title: 'Intervals', paragraph: 'Learn to recognice the distance between notes'}}
            />
            <StartingSection 
                isSelected={selected === 1}
                setSelected={() => setSelected(1)}
                hideContent={hideContent}
                handleProgressClick={handleProgressClick}
                colors='text-yellow-900 dark:text-yellow-300 from-yellow-600/50 to-yellow-400/30'
                btnColors='bg-yellow-200/60 ring-yellow-900 dark:bg-yellow-950 dark:ring-yellow-500'
                path='/eartraining/melodies'
                text={{title: 'Melodies', paragraph: 'Learn to recognice a progression of intervals'}}
            />
            <StartingSection 
                isSelected={selected === 2}
                setSelected={() => setSelected(2)}
                hideContent={hideContent}
                handleProgressClick={handleProgressClick}
                colors='text-red-900 dark:text-red-300 from-red-600/50 to-red-300/50'
                btnColors='bg-red-200/70 ring-red-700 dark:bg-red-950 dark:ring-red-500'
                path='/eartraining/chords'
                text={{title: 'Chord quality', paragraph: 'Learn to recognice the quality of chords'}}
            />
            <StartingSection 
                isSelected={selected === 3}
                setSelected={() => setSelected(3)}
                hideContent={hideContent}
                handleProgressClick={handleProgressClick}
                colors='text-fuchsia-900 dark:text-fuchsia-400 from-violet-600/50 to-violet-300/40'
                btnColors='bg-fuchsia-200/60 ring-fuchsia-700 dark:bg-violet-950 dark:ring-fuchsia-500'
                path='/eartraining/progressions'
                progressionPath='/eartraining/progressions/progress-mode'
                text={{title: 'Chord progressions', paragraph: 'Learn to recognice progressions of chords'}}
            />
            
            
            
        </div>
        
        {/*<div className="absolute w-full h-16 px-2 top-20 flex justify-center gap-4 sm:hidden overflow-x-hidden">
            <div onMouseDown={() => handleMouseOver(0)} className={`flex justify-center items-center flex-1 -skew-x-12 bg-gradient-to-r from-blue-600/50 to-blue-300/50 rounded-lg px-4 py-2 z-30 ${(selected === 0) && 'hidden pointer-events-none'}`}>
                <p className="text-blue-950 dark:text-blue-300 skew-x-12 text-center font-montserrat">Intervals</p>
            </div>
            <div onMouseDown={() => handleMouseOver(1)} className={`flex justify-center items-center flex-1 -skew-x-12 bg-gradient-to-r from-yellow-600/50 to-yellow-400/30 rounded-lg px-4 py-2 z-30 ${(selected === 1) && 'hidden pointer-events-none'}`}>
                <p className="text-yellow-900 dark:text-yellow-300 skew-x-12 text-center font-montserrat">Melodies</p>
            </div>
            <div onClick={() => handleMouseOver(2)} className={`flex justify-center items-center flex-1 -skew-x-12 bg-gradient-to-r from-red-600/50 to-red-300/50 rounded-lg px-4 py-2 z-30 ${(selected === 2) && 'hidden pointer-events-none'}`}>
                <p className="text-red-900 dark:text-red-300 skew-x-12 text-center font-montserrat">Chord quality</p>
            </div>
            <div onClick={() => handleMouseOver(3)} className={`flex justify-center items-center flex-1 -skew-x-12 bg-gradient-to-r from-violet-600/50 to-violet-300/40 rounded-lg px-4 py-2 z-30 ${(selected === 3) && 'hidden pointer-events-none'}`}>
                <p className="text-fuchsia-900 dark:text-fuchsia-400 skew-x-12 text-center font-montserrat">Chord progression</p>
            </div>
        </div>*/}

        {displayLogin && 
            <LoginModal navigate={rememberedRoute} handleAuthentication={refreshAuthentication}/>
        }

    </div>
  )
}

export default EarTrainingHome