import { motion } from 'framer-motion'

const ProgressBorder = ({currentStep, totalSteps=11}) => {

    const progress = {
        start: { pathLength: 0},
        progressed: { pathLength: currentStep/totalSteps, transition: {
            type: 'spring', duration: 0.5, bounce: 0
        } }
    }

  return (
    <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className='absolute h-full w-full z-50 pointer-events-none'
        width='100%'
        height='100%'
    >
        <motion.rect
            variants={progress}
            initial='start'
            animate='progressed'
            width='100%'
            height='100%'
            rx='16'
            strokeWidth={10}
            className=' fill-none stroke-sky-400'
        />


    </motion.svg>
  )
}

export default ProgressBorder