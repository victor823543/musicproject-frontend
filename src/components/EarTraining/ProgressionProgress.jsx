import { useState } from 'react'
import { ProgressCircle, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react'
import FullProgress from './FullProgress'
import useProgression from '../../hooks/useProgression'
import SessionPage from './components/SessionPage'
import FinishModal from './components/FinishModal'

const ProgressionProgress = (props) => {
    const [showAll, setShowAll] = useState(false)
    const {
        showStart,
        showMain,
        showRoman,
        isFinished,
        playingReference,
        progressionSession,
        chordNames,
        passedprogression,
        result,
        stats,
        guess,
        spotSelected,
        progress,
        handleStartClick,
        handleAgainClick,
        handleContinueClick,
        handleGuessClick,
        handleRestartClick,
        handleTempoMinus,
        handleTempoPlus,
        setShowRoman,
        setSpotSelected,
        refMidi
    } = useProgression(true)

    const defaultColor = 'bg-slate-200/40 dark:bg-slate-500/20'
    const clickedColor = 'bg-blue-500/30 dark:bg-sky-400/30'
    

  return (

    <SessionPage
        session={progressionSession}
        refMidi={refMidi}
    >
        {showStart &&
            <div className='fixed inset-0 cover bg-slate-700/40 flex flex-col justify-center items-center dark:text-sky-200/80'>
                <div className='bg-zinc-200 dark:bg-slate-950 p-20 flex flex-col gap-10 items-center rounded-xl shadow-xl overflow-y-scroll hideScrollbar'>
                    <h1 className='font-montserrat text-3xl text-center'>Progress mode</h1>
                    <div className='flex gap-10'>
                        <div className='relative flex flex-col items-center gap-3'>
                            <h2 className='font-montserrat text-xl'>Total progress</h2>
                            <ProgressCircle value={progressionSession?.totalProgress} size="lg" showAnimation>
                                <span className="text-sm font-medium font-montserrat text-slate-700">{`${progressionSession?.totalProgress}%`}</span>
                            </ProgressCircle>
                        </div>
                        <div className='relative flex flex-col items-center gap-3'>
                            <h2 className='font-montserrat text-xl'>Session progress</h2>
                            <ProgressCircle value={progressionSession?.sessionBest} size="lg" showAnimation>
                                <span className="text-sm font-medium font-montserrat text-slate-700">{`${progressionSession?.sessionBest}%`}</span>
                            </ProgressCircle>
                        </div>
                    </div>
                    <h2 className='font-montserrat text-2xl text-center mt-5'>{`Current session - ${progressionSession?.level}`}</h2>
                    <button onClick={() => setShowAll(true)} className='py-2 px-4 bg-blue-600/30 ring-2 ring-blue-800 dark:ring-sky-400 rounded-sm font-montserrat'>Show all sessions</button>

                    <div className='flex gap-10'>
                        <div className='flex flex-col items-center'>
                            <h3>Session information</h3>
                            <TabGroup>
                                <TabList variant='line'>
                                    <Tab className='text-gray-500'>Chords</Tab>
                                    <Tab className='text-gray-500'>Start</Tab>
                                    <Tab className='text-gray-500'>Inversions</Tab>
                                    <Tab className='text-gray-500'>Length</Tab>
                                    <Tab className='text-gray-500'>Progression length</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <p className='mt-4 leading-6 text-tremor-default text-gray-500 dark:text-dark-tremor-content'>{chordNames.map((chord) => `${chord['roman']}, `)}</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p className='mt-4 leading-6 text-tremor-default text-gray-500 dark:text-dark-tremor-content'>{progressionSession?.start}</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p className='mt-4 leading-6 text-tremor-default text-gray-500 dark:text-dark-tremor-content'>{progressionSession?.inversions.map((inversion, index) => `${inversion}${(progressionSession?.inversions.length > index + 1) ? ', ' : ''}`)}</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p className='mt-4 leading-6 text-tremor-default text-gray-500 dark:text-dark-tremor-content'>{progressionSession?.length}</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p className='mt-4 leading-6 text-tremor-default text-gray-500 dark:text-dark-tremor-content'>{progressionSession?.progression_length}</p>
                                    </TabPanel>
                                </TabPanels>
                            </TabGroup>
                        </div>

                    </div>
                    <button onClick={handleStartClick} className='py-2 px-4 bg-blue-600/30 ring-2 ring-blue-800 dark:ring-sky-400 rounded-sm font-montserrat'>Start current session</button>
                </div>
            </div>
        }

        {showMain && 
            <div className=' min-h-full pt-20'>
                <div>
                    <div className='flex gap-1'>
                        {Object.entries(result).map(([num, status]) => 
                            <div key={num} className={`h-6 flex-grow ${(status === 1) ? 'bg-green-500' : (status === 2) ? 'bg-red-500' : 'bg-slate-900/30 dark:bg-cyan-400/30'}`}></div>
                        )}
                    </div>
                </div>
                <div className='mt-14 max-xs:mt-6 max-sm:mt-10 flex flex-col items-center'>
                    <h1 className='h1-et'>Listen to the progression</h1>
                    <button onClick={handleContinueClick} className='py-2 px-4 max-xs:py-1 max-xs:px-3 text-lg max-xs:text-sm max-sm:text-base dark:text-sky-200 font-montserrat bg-sky-500/40 dark:bg-blue-900/80 ring-2 ring-sky-700 dark:ring-blue-500 rounded-md shadow-lg mb-4 max-xs:mb-2'>{progress ? 'Continue' : 'Start'}</button>
                    <button onClick={handleAgainClick} className={`py-2 px-4 max-xs:py-1 max-xs:px-3 text-lg max-xs:text-sm max-sm:text-base dark:text-sky-200 font-montserrat bg-sky-500/40 dark:bg-blue-900/80 ring-2 ring-sky-700 dark:ring-blue-500 rounded-md shadow-lg ${!progress && 'hidden'}`}>Listen again</button>
                </div>
                <div className='mt-10 max-xs:mt-2 flex flex-col items-center px-20 max-sm:px-6 '>
                    <div className='max-w-[500px]'>
                        <h1 className='h1-et'>Take a guess</h1>
                        <div className='flex flex-wrap justify-center gap-4'>
                            {chordNames.map((chord) => 
                                <div onClick={() => handleGuessClick(chord)} key={chord['roman']} className={`${defaultColor} guess-btn-prg`}>{showRoman ? chord['roman'] : chord['name']}</div>
                            )}
                        </div>
                    </div>
                    
                </div>
                <div className={`absolute top-1/3 max-sm:top-2/3 right-0 overflow-hidden`}>
                    <div className='bg-zinc-200/40 dark:bg-slate-700/40 flex flex-col gap-5 py-3'>
                        <div className='flex flex-col items-center'>
                            <svg onClick={handleTempoMinus} xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10 dark:stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                            </svg>

                            <div className='font-bold dark:text-white'>BPM</div>

                            <svg onClick={handleTempoPlus} xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10 dark:stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                        </div>
                        <div className='px-2'>
                            <button onClick={() => setShowRoman(!showRoman)} className='px-2 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md font-bold'>{showRoman ? 'Name' : 'Roman'}</button>

                        </div>
                    </div>
                </div>
                
                {playingReference && 
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-400/30 dark:bg-slate-700/40 p-5'>
                        <p className='text-xl font-montserrat dark:text-white text-center' >
                            Playing reference chord - tonic
                        </p>
                    </div>
                }

                {guess && 
                    <div className='flex justify-center gap-4 mt-5'>
                        {guess.map((guess, index) => 
                        <div 
                        key={index} 
                        onClick={() => setSpotSelected(index + 1)}
                        className={`guess-btn scale-110 ${(spotSelected === index + 1) ? clickedColor : defaultColor}`}>
                            {showRoman ? guess['roman'] : guess['name']}
                        </div>
                        )}
                    </div>
                }
                
                
                <div className={`${passedprogression['visible'] ? 'opacity-100' : 'opacity-0'} pointer-events-none max-sm:absolute max-sm:text-3xl max-xs:text-xl max-sm:top-1/2 max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 max-sm:-translate-y-1/2
                     py-4 px-6 shadow-xl bg-slate-200/70 dark:bg-slate-900/60 mt-16 opacity-0 transition-opacity duration-1000 ease-in-out text-5xl text-center font-montserrat font-bold `}>
                    {passedprogression['chords'].map((chord, index) => 
                    <div 
                    key={index} 
                    className={`${chord['correct'] ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-500'}`}>
                        {showRoman ? chord['roman'] : chord['name']}
                    </div>
                    )}
                </div>

            </div>
        }

        {isFinished &&
            <FinishModal
                handleRestartClick={handleRestartClick}
                progressMode
                moveOn={stats.sessionStats['moveOn']}
            >
                <p className='fonst-montserrat text-lg'>{`Progressions: ${stats['sessionStats']['correct']}/${stats['sessionStats']['total']}`}</p>
                <p className='fonst-montserrat text-lg'>{`Chords: ${stats['chordTotalStats']['correct']}/${stats['chordTotalStats']['total']}`}</p>
                <div className='flex flex-col items-center gap-3'>
                    <h2 className='font-montserrat text-xl'>Session progress</h2>
                    <ProgressCircle value={stats['sessionStats']['percent']} size="lg">
                        <span className="text-sm font-medium font-montserrat text-slate-700">{`${stats['sessionStats']['percent']}%`}</span>
                    </ProgressCircle>
                </div>
            </FinishModal>
        }
        
        {showAll &&
            <FullProgress type='progression' levelStats={progressionSession?.progressInfo.levelStats} current={progressionSession?.level} close={() => setShowAll(false)}/>
        }
    </SessionPage>
  )
}

export default ProgressionProgress