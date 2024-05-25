import IntroTextBox from "../IntroTextBox"
import { AnimatePresence } from "framer-motion"

const CreateFormIntro = ({currentStep, nextStep, onSelectKeyChange, onSelectLengthChange, onSelectQualityChange, onCreateClick}) => {
    const keys = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'Db', 'Eb', 'Gb', 'Ab', 'Bb']
    return (
        <div className='relative h-full w-full flex max-lg:justify-center max-lg:items-center'>
            <div className='absolute w-full h-full bg-zinc-200 dark:bg-gradient-to-br dark:from-black dark:to-slate-800 rounded-md inset-0 -z-20'></div>
            <div className="absolute w-full h-full inset-0 rounded-md bg-zinc-300/40 dark:bg-neutral-800/60 z-20"></div>
            <div className='h-full flex flex-col justify-center lg:mx-auto py-5 px-2'>
                <form className='flex flex-col font-montserrat gap-4'>
                <div className={`${currentStep === 1 && 'z-40'} relative flex flex-col gap-4`}>
                    <label className='intro-label'>Pick a key</label>
                    <select className="teal-select" onChange={(e) => {nextStep(); onSelectKeyChange(e);}}>
                        <option value="">Randomize</option>
                        {keys.map((key, index) => (
                            <option key={index} value={key}>{key}</option>
                        ))}
                    </select>
                    <IntroTextBox key={1} active={currentStep === 1} position='lg:left-full max-lg:top-full'>
                        Get started by generating a song. <br /> Pick the key or select RANDOMIZE for a random key...
                    </IntroTextBox>
                </div>
                <div className={`${currentStep === 2 && 'z-40'} relative flex flex-col gap-4`}>
                    <label className='intro-label'>Pick a length</label>
                    <select className="teal-select" onChange={(e) => {nextStep(); onSelectLengthChange(e);}}>
                
                        <option value="1">1 Verse</option>
                        <option value="2">2 Verses</option>
                        <option value="3">3 Verses</option>
                        <option value="4">4 Verses</option>
                    </select>
                    <IntroTextBox key={2} active={currentStep === 2} position='lg:right-full max-lg:top-full'>
                        ...choose the number of verses...
                    </IntroTextBox>
                </div>
                <div className={`${currentStep === 3 && 'z-40'} relative flex flex-col gap-4`}>
                    <label className='intro-label'>Pick quality</label>
                    <select className="teal-select" onChange={(e) => {nextStep(); onSelectQualityChange(e);}}>
                        <option value="Major">Major</option>
                        <option value="Minor">Minor</option>
                    </select>
                    <IntroTextBox key={3} active={currentStep === 3} position='lg:left-full max-lg:bottom-full'>
                        ...and pick the quality (Major/Minor)
                    </IntroTextBox>
                </div>
                <div className={`${currentStep === 4 && 'z-40'} relative flex flex-col gap-4`}>
                    <div className='flex justify-center'>
                        <button type='submit' className='text-2xl sm:text-3xl lg:text-xl bg-sky-600/50 dark:bg-sky-400/50 ring-1 dark:ring-2 rounded-md shadow-md ring-sky-800 dark:ring-sky-600 text-zinc-50 lg:text-sky-950 dark:text-sky-100 w-fit py-2 px-4'  onClick={(e) => {nextStep(); onCreateClick(e);}}>Create Song</button>
                    </div>
                    <IntroTextBox key={4} active={currentStep === 4} position='lg:right-full lg:bottom-0 max-lg:bottom-full'>
                        ...and submit
                    </IntroTextBox>
                </div>
            </form>
            </div>
            
        
        </div>
        
    )
}

export default CreateFormIntro