import {useEffect, memo, useState} from 'react'
import {motion, useAnimate, usePresence, AnimatePresence } from 'framer-motion'



const IntroTextBox = ({children, active, width, position, hideOnClick=false}) => {
    const TextBox = () => {
        const [isPresent, safeToRemove] = usePresence()
        const [scope, animate] = useAnimate()
        const [isVisible, setIsVisible] = useState(true)
    
        useEffect(() => {
            if (isPresent) {
                const enterAnimation = () => {
                    animate(scope.current, { y: [40, 0], opacity: [0, 1]}, {delay: 0.5, duration: 0.3})
                    animate('span', { x: '100%' }, {delay: 0.65, duration: 0.5, ease: 'easeIn'} )
                }
                enterAnimation()
            } else {
                const exitAnimation = async () => {
                    await animate('span', { x: ['100%', 0]}, {duration: 0.3, ease: 'easeIn'})
                    await animate('p', { opacity: 0 }, {duration: 0.15})
                    animate(scope.current, { opacity: 0}, {delay: 0.2, duration: 0.2})
                    await animate('span', { x: '-100%'}, {duration: 0.3, ease: 'easeIn'})
                    safeToRemove()
                }
                exitAnimation()
            }
        }, [isPresent])
    
      return (
        
                <div 
                    ref={scope} 
                    onClick={hideOnClick ? () => setIsVisible(false) : undefined}
                    className={`absolute ${isVisible ? 'block' : 'hidden'} ${position ? position : 'left-full'} ${width ? width : 'w-full'} z-50 p-4 m-4 bg-white dark:bg-slate-900/80 border border-zinc-300 dark:border-slate-800 shadow-xl dark:shadow-lg dark:shadow-sky-200/20 font-montserrat overflow-hidden rounded-xl`}
                >
                    <p className='font-semibold text-sky-950 dark:text-sky-100'>
                        {children}
                    </p>
                    {hideOnClick && <p className="font-light text-base text-end mt-1">Click to hide</p>}
                    <span className='absolute inset-0 w-full h-full bg-gradient-to-r to-slate-100 from-sky-300'></span>
                </div>
            
      )
    }

    return (
        <AnimatePresence>
            {active &&
                <TextBox />
            }
        </AnimatePresence>
    )
}

export default memo(IntroTextBox, (prevProps, nextProps) => {
    return (
        prevProps.active === nextProps.active &&
        prevProps.children === nextProps.children &&
        prevProps.width === nextProps.width &&
        prevProps.position === nextProps.position
    )
})