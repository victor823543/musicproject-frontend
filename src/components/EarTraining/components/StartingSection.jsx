import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const StartingSection = ({isSelected, setSelected, hideContent, handleProgressClick, colors, btnColors, path, progressionPath=null, text}) => {
    const navigate = useNavigate()
    return (
    <motion.section 
        className={`${(isSelected) ? 'max-xl:w-1/3 sm:max-xl:scale-110 max-lg:w-1/2' : 'sm:max-xl:w-[250px] sm:max-lg:w-[100px] sm:opacity-50 '} max-sm:w-auto transition-all ease-in-out duration-500 py-10 max-sm:py-6 px-4 overflow-y-clip `}
        layout
    >
        <div onMouseOver={setSelected} className={`${colors} h-full bg-gradient-to-r sm:-skew-x-12  rounded-lg flex flex-col gap-6 justify-center items-center overflow-hidden max-sm:py-10`}>
            <motion.div
                className='flex flex-col gap-6 '
                initial={{opacity: 1, scale: 1 }}
                animate={(isSelected || !hideContent) ? {opacity: 1, scale: 1 } : {opacity: 0, scale: 0}}
                transition={{duration: 0.3, delay: 0.2, ease: 'easeInOut'}}
            >
                <div className="sm:skew-x-12 px-16">
                    <h2 className="text-4xl  font-montserrat text-center mb-3">{text.title}</h2>
                    <p className="text-lg font-montserrat font-light">{text.paragraph}
                    </p>
                </div>
                <div className="flex flex-col items-center sm:skew-x-12 px-16">
                    <button onClick={() => navigate(path)} className={`${btnColors} btn-e mb-2 `}>Custom practice</button>
                    <p className="font-montserrat font-light text-center text-pretty">Practice freely with your own settings</p>
                </div>
                {progressionPath && 
                <div className="flex flex-col items-center sm:skew-x-12 px-16">
                    <button onClick={() => handleProgressClick(progressionPath)} className={`${btnColors} btn-e mb-2 `}>Progress mode</button>
                    <p className="font-montserrat font-light text-center text-pretty">Learn with automated progress</p>
                </div>}
            </motion.div>
        </div>
    </motion.section>
  )
}

export default StartingSection