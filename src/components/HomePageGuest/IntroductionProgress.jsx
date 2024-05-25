import { motion } from 'framer-motion'

const IntroductionProgress = ({activePosition=1, totalPositions=4}) => {
    const variantsCircle = {
        unmarked: { opacity: 0.5, backgroundColor: 'rgba(125 211 252 0)', border: '3px solid', borderColor: 'rgb(256 256 256)'},
        marked: { opacity: 1, backgroundColor: 'rgb(125 211 252)'},
        current: { opacity: 1, scale: 1.2, backgroundColor: 'rgba(125 211 252 0.4)'}
    }

    const variantsBar = {
        unmarked: { opacity: 0.5, backgroundColor: 'rgb(256 256 256)', x: -100},
        marked: { opacity: 1, backgroundColor: 'rgb(125 211 252)', x: 0},
        current: { opacity: 0.5, backgroundColor: 'rgb(256 256 256)', x: -100},
    }

  return (
    <div className='fixed top-20 w-full h-20 flex justify-center gap-2 z-30'>
        {Array.from({length: totalPositions}, (_, index) => index + 1).map(position => {
            const animationState = activePosition === position ? 'current' : activePosition > position ? 'marked' : 'unmarked'
            return (
                <div 
                    key={position}
                    className='flex gap-2 items-center'
                >
                    <motion.div
                        className='rounded-full size-10 bg-white flex items-center justify-center box-border'
                        variants={variantsCircle}
                        animate={animationState}
                    >
                    </motion.div>
                    <motion.div
                        className={`${position === totalPositions ? 'hidden' : 'block'} h-1 w-20 bg-white/50 relative overflow-hidden`}
                    >
                        <motion.div
                            className='h-full w-full bg-slate-800'
                            variants={variantsBar}
                            animate={animationState}
                        ></motion.div>
                    </motion.div>
                </div>
            )
        })}
    </div>
  )
}

export default IntroductionProgress