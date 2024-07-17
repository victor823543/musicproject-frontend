import { useEffect } from 'react'
import { motion, useAnimate, usePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'


const StartSectionAuth = ({userName, statsLink, songsLink, introLink}) => {
    const navigate = useNavigate()
    const [isPresent, safeToRemove] = usePresence()
    const [scope, animate] = useAnimate()

    useEffect(() => {
        if (isPresent) {
            const enterAnimation = () => {
                animate('span', { x: '100%' }, {delay: 0.15, duration: 0.5, ease: 'easeIn'} )
                animate('#buttonContainer', { opacity: 1 }, { staggerChildren: 0.25 })
                for (let i=1; i<=4; i++) {
                    animate(`button:nth-of-type(${i})`, {opacity: 1, x: 0}, { duration: 0.7, delay: (i-1) * 0.25 })
                }
            }
            enterAnimation()
        } else {
            const exitAnimation = async () => {
                for (let i=1; i<=4; i++) {
                    animate(`button:nth-of-type(${i})`, {opacity: 0, x: '-200%'}, { duration: 0.7, delay: (i-1) * 0.25 })
                }
                await animate('span', { x: ['100%', 0]}, {duration: 0.4, ease: 'easeIn'})
                await animate('h1', { opacity: 0 }, {duration: 0.15})
                await animate('span', { x: '-100%'}, {duration: 0.4, ease: 'easeIn'})
                await animate('#textContainer', { opacity: 0, x: -300}, { duration: 0.25, ease: 'easeInOut'})
                safeToRemove()
            }
            exitAnimation()
        }
    }, [isPresent])

    const variants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 75 },
    }
    const buttonContainerVariants = {
        hidden: { opacity: 0.7 },
        visible: { opacity: 1, transition: {
            staggerChildren: 0.25
        }}
    }
    const buttonVariants = {
        visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
        hidden: { opacity: 0, x: -100 },
    }
    
  return (
    <div 
        className={`flex flex-col max-sm:items-center text-black dark:text-slate-300 px-6 md:px-12 w-fit`} 
        ref={scope}
        
    >   
        <motion.div 
            id='textContainer'
            className='relative bg-gradient-to-r from-slate-200 to-sky-700/50 dark:bg-gradient-to-r dark:from-black dark:to-sky-800/70 backdrop-blur-sm px-6 rounded-lg my-10 py-2 font-montserrat flex flex-col gap-2'
            variants={variants}
            initial='hidden'
            animate='visible'
            transition={ { duration: 0.25}}
        >
            <div className='relative overflow-hidden'>
                <h1 className=' text-7xl max-md:text-5xl max-sm:text-4xl max-xs:text-3xl font-extrabold dark:font-light text-shadow-sm shadow-sky-900 dark:text-shadow dark:shadow-sky-400'>
                    Welcome back
                </h1>
                <span 
                    className='absolute inset-0 w-full h-full bg-gradient-to-r to-slate-100 from-sky-300'
                ></span>
            </div>
            
            <div className='relative overflow-hidden'>
                <h1 className='text-9xl max-xl:text-8xl max-md:text-7xl max-sm:text-6xl max-xsPlus:text-5xl max-xs:text-4xl text-slate-300 bg-gradient-to-r to-black from-sky-900 dark:from-sky-50 dark:to-sky-300 dark:text-sky-950 dark:bg-sky-100 rounded-lg p-2 font-extrabold'>
                    {userName}
                </h1>
                <span 
                    className='absolute inset-0 w-full h-full bg-gradient-to-r to-slate-100 from-sky-300'
                ></span>
            </div>
        </motion.div>
        <motion.div 
            id='buttonContainer'
            className='sm:ml-10 flex flex-col'
            variants={buttonContainerVariants}
            initial='hidden'
            animate='visible'
            
        >
            <motion.button whileHover={{scale: 1.15}} variants={buttonVariants} className='btn-h' onClick={() => navigate('/music')}>Create Music</motion.button>
            <motion.button whileHover={{scale: 1.15}} variants={buttonVariants} className='btn-h sm:ml-5' onClick={() => navigate('/eartraining')}>Ear Training</motion.button>
            <motion.button whileHover={{scale: 1.15}} variants={buttonVariants} className='btn-h sm:ml-10' onClick={songsLink}>Stored Songs</motion.button>
            <motion.button whileHover={{scale: 1.15}} variants={buttonVariants} className='btn-h sm:ml-16' onClick={statsLink}>User Stats</motion.button>
            <motion.button whileHover={{scale: 1.15}} variants={buttonVariants} className='btn-h sm:ml-20' onClick={introLink}>Introduction</motion.button>
        </motion.div>
    </div>
  )
}

export default StartSectionAuth