import useCreateMusic from "../../../hooks/useCreateMusic"
import MusicPageChords from "../../MusicPage/MusicPageChords"
import MusicPageAudio from "../../MusicPage/MusicPageAudio"
import CreateFormIntro from "./CreateFormIntro"
import MusicPageKeyboard from "../../MusicPage/MusicPageKeyboard"
import MusicPageOptions from "../../MusicPage/MusicPageOptions"
import IntroTextBox from "../IntroTextBox"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const CreateIntroduction = ({currentStep, nextStep, authenticated=false}) => {
    const navigate = useNavigate()
    const {
        song,
        setSong,
        songAudio,
        showChord,
        showModal,
        showAudioModal,
        toggleModal,
        toggleAudioModal,
        chordPlaying,
        chordReplacements,
        editMode,
        setEditMode,
        changeChord,
        handleSelectKeyChange,
        handleCreateClick,
        handleSelectLengthChange,
        handleSelectQualityChange,
        handleChordClick,
        handleCreateNewClick,
        handleTransposeClick,
        handleProgress,
        fetchStoreSong,
        fetchSongAudio,
    } = useCreateMusic()

    const nextStepChordClick = (chord) => {
        if (currentStep === 5) {
            nextStep()
        }
        handleChordClick(chord) 
        
        
    }

    const nextStepCreateClick = (options) => {
        nextStep()
        handleCreateNewClick(options)
    }

    const nextStepTransposeClick = (options) => {
        nextStep()
        handleTransposeClick(options)
    }

    const nextStepChangeChord = (targetVerse, targetChord, newChord) => {
        nextStep()
        setEditMode(false)
        changeChord(targetVerse, targetChord, newChord)
    }

    const clickToProgressSteps = [6]

  return (
    <div className={`${song && 'bg-mp'}relative h-full flex flex-col justify-center items-center ${song && !showModal && ' py-10 px-5'}`}>
                <motion.div 
                    initial={{opacity: 0}}
                    animate={clickToProgressSteps.includes(currentStep) ? {opacity: 1} : {opacity: 0}}
                    transition={{delay: 2, duration: 1}}
                    className="absolute max-lg:hidden bottom-20 left-1/2 -translate-x-1/2 text-center dark:text-slate-100 text-lg font-extralight p-4 bg-zinc-200 dark:bg-slate-800/70 backdrop-blur-sm z-40"
                >
                    Click anywhere to continue
                </motion.div>

                {!song  && <CreateFormIntro 
                    onSelectKeyChange={handleSelectKeyChange} 
                    onCreateClick={handleCreateClick} 
                    onSelectLengthChange={handleSelectLengthChange}
                    onSelectQualityChange={handleSelectQualityChange}
                    currentStep={currentStep}
                    nextStep={nextStep}
                /> }
                {song && 
                <>
                <div className="absolute w-full h-full inset-0 rounded-md bg-zinc-300/70 dark:bg-black/60 z-20 pointer-events-none "></div>
                {currentStep === 11 && 
                    <motion.div 
                        className="absolute flex flex-col items-center gap-3 p-10 max-sm:p-6 m-2 z-50 dark:text-white text-lg text-center bg-white dark:bg-slate-900 border border-zinc-300 dark:border-slate-800 shadow-xl dark:shadow-lg dark:shadow-sky-200/20 font-montserrat rounded-xl"
                        initial={{y: 30, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                    >   
                        {authenticated ? 
                            <>
                                <p>You are now ready to generate songs and practice playing over chords.</p>
                                <div className="flex justify-center">
                                    <button onClick={() => navigate('/music')} className="btn-s">START PRACTICING</button>
                                </div>
                            </>
                            :
                            <>
                                <p>You are now ready to generate songs and practice playing over chords. <br /> Continue as guest or create an account <span className="text-xl font-bold text-sky-500 border-b border-sky-700">FOR FREE</span>  to access all features.</p>
                                <div className="flex justify-center gap-5 flex-wrap">
                                    <button onClick={() => navigate('/signup')} className="btn-s">CREATE ACCOUNT</button>
                                    <button onClick={() => navigate('/music')} className="btn-s">CONTINUE AS GUEST</button>
                                </div>
                            </>
                            
                        }
                        <p className=" text-2xl">OR...</p>
                        <p>Explore the ear-training section</p>
                        <button onClick={() => navigate('/eartraining')} className="btn-s">EAR TRAINING</button>

                    </motion.div>
                }
                {editMode &&
                    <div className='absolute top-0 left-0 inset-0 w-full h-full bg-zinc-800 bg-opacity-50 z-10 pt-20 pb-4'></div>
                }
                {/* For bigger than sm device width */}
                <div className='relative w-full h-full flex max-lg:flex-col max-md:hidden my-6 dark:text-sky-200/80 pointer-events-auto'>
                    <div className='w-full h-20 lg:hidden'></div>
                    <div className='absolute w-full h-full bg-zinc-200 inset-0 -z-20'></div>
                    <div className='lg:w-1/2 h-full flex flex-col justify-between'>
                        <div className={`${(currentStep === 5 || currentStep === 10) && 'z-40'} relative`}>
                            <MusicPageChords song={song} handleChordClick={nextStepChordClick} chordPlaying={chordPlaying} changeChord={nextStepChangeChord} editMode={editMode} handleEditClick={() => setEditMode(!editMode)} chordReplacements={chordReplacements}/>
                            <IntroTextBox key={5} active={currentStep === 5} width='w-3/4' position='top-full'>
                                The chords are displayed at the top. <br /> Press a Chord to see how to play it...
                            </IntroTextBox>
                            <IntroTextBox key={10} active={currentStep === 10} width='w-3/4' position='top-full'>
                                By pressing the pen you can enter edit mode and freely switch chords within the key.
                            </IntroTextBox>
                        </div>
                        <button className='btn-s w-fit mx-auto bottom-5 relative'>Store Song</button>
                        <div className={`${[7, 8, 9].includes(currentStep) && 'z-40'} relative`}>
                            <MusicPageOptions song={song} handleCreateClick={nextStepCreateClick} handleTransposeClick={nextStepTransposeClick}/>
                            <IntroTextBox key={7} active={currentStep === 7} width='w-3/4' position='bottom-full'>
                                You can generate a new song whenever you want by changing the settings and pressing CREATE NEW...
                            </IntroTextBox>
                            <IntroTextBox key={8} active={currentStep === 8} width='w-3/4' position='bottom-full'>
                                You can also select to include advanced chords by pressing SHOW ADVANCED SETTINGS...
                            </IntroTextBox>
                            <IntroTextBox key={9} active={currentStep === 9} width='w-3/4' position='bottom-full'>
                                Lastly, you can transpose any song by only changing the key and pressing TRANSPOSE SONG...
                            </IntroTextBox>
                        </div>
                        
                    </div>
                    <div className='lg:w-1/2'>
                        <div className={`${currentStep === 6 && 'z-40'} relative`}>
                            <MusicPageKeyboard showChord={showChord}/>
                            <IntroTextBox key={6} active={currentStep === 6} width='w-3/4' position='lg:top-full max-lg:bottom-full'>
                                The Chord is now displayed on the piano...
                            </IntroTextBox>
                        </div>
                        
                        <MusicPageAudio audio={songAudio} handleGetAudioClick={fetchSongAudio} handleProgress={handleProgress}/>
                    </div>
                    
                </div>

                {/* For smaller than sm device width */}
                <div className='relative w-full h-full flex flex-col dark:text-sky-200/80 md:hidden'>
                    <div className='absolute w-full h-full bg-zinc-200 inset-0 -z-20'></div>
                    <div className='w-full h-20 lg:hidden'></div>
                    {[7, 8, 9].includes(currentStep) && 
                        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-zinc-800 bg-opacity-50 z-30'>
                            <div className='relative bg-zinc-200 dark:bg-slate-700 max-h-full xsPlus:px-8 py-8 rounded-lg shadow-md overflow-scroll'>
                                <MusicPageOptions song={song} handleCreateClick={nextStepCreateClick} handleTransposeClick={nextStepTransposeClick} />
                                <button className='bg-red-300 border-2 border-red-500 px-4 py-2 rounded-md mt-4 text-black font-light ml-4' onClick={toggleModal}>Close</button>

                                <IntroTextBox hideOnClick key={7} active={currentStep === 7} width='w-3/4' position='top-1/2 '>
                                    You can generate a new song whenever you want by changing the settings and pressing CREATE NEW... 
                                </IntroTextBox>
                                <IntroTextBox key={8} active={currentStep === 8} width='w-3/4' position='top-0'>
                                    You can also select to include advanced chords by pressing SHOW ADVANCED SETTINGS followed by CREATE NEW...
                                </IntroTextBox>
                                <IntroTextBox hideOnClick key={9} active={currentStep === 9} width='w-3/4' position='top-1/2'>
                                    Lastly, you can transpose any song by only changing the key and pressing TRANSPOSE SONG...
                                </IntroTextBox>
                            </div>
                            
                        </div>
                    }
                    {showAudioModal && 
                        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-zinc-800 bg-opacity-50 z-30 pt-20 pb-4'>
                            <div className='bg-zinc-200 dark:bg-slate-700 max-h-full xsPlus:px-8 py-8 rounded-lg shadow-md overflow-scroll'>
                                <MusicPageAudio audio={songAudio} handleGetAudioClick={fetchSongAudio} handleProgress={handleProgress} inModal={true}/>    
                                <button className='bg-red-300 border-2 border-red-500 px-4 py-2 rounded-md mt-4 text-black font-light ml-4' onClick={toggleAudioModal}>Close</button>
                            </div>
                            
                        </div>
                    }
                    
    
                    <div className='h-full flex flex-col justify-between mb-4'>

                        
                        <div className={`${(currentStep === 5 || currentStep === 10) && 'z-40'} relative`}>
                            <MusicPageChords song={song} handleChordClick={nextStepChordClick} chordPlaying={chordPlaying} changeChord={nextStepChangeChord} editMode={editMode} handleEditClick={() => setEditMode(!editMode)} chordReplacements={chordReplacements}/>
                            <IntroTextBox key={5} active={currentStep === 5} width='w-3/4' position='top-full'>
                                The chords are displayed at the top. <br /> Press a Chord to see how to play it...
                            </IntroTextBox>
                            <IntroTextBox key={10} active={currentStep === 10} width='w-3/4' position='top-full'>
                                By pressing the pen you can enter edit mode and freely switch chords within the key.
                            </IntroTextBox>
                        </div>
                        
                        <div className={`${currentStep === 6 && 'z-40'} relative`}>
                            <div className='flex justify-center'>
                                <button className='btn-s w-fit' onClick={() => {nextStep()}}>Change song</button>
                            </div>
                            <MusicPageKeyboard showChord={showChord}/>
                            <IntroTextBox key={6} active={currentStep === 6} width='w-3/4' position='bottom-full'>
                                The Chord is now displayed on the piano. <br /> Now press CHANGE SONG...
                            </IntroTextBox>
                        </div>
                        <div className='flex justify-center'>
                            <button className='btn-s w-fit' onClick={toggleAudioModal}>Generate audio</button>
                        </div>
                        
                        <MusicPageAudio audio={songAudio} handleGetAudioClick={fetchSongAudio} handleProgress={handleProgress}/>
                    </div>
                    
                    
                </div>
                </>
                
                }
            
            
        </div>
    )
}

export default CreateIntroduction