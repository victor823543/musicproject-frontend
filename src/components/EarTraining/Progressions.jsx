import ProgressionsSettings from './ProgressionsSettings'
import SessionPage from './components/SessionPage'
import FinishModal from './components/FinishModal'
import useProgression from '../../hooks/useProgression'

const Progressions = () => {
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
        handleExtendClick,
        handleTempoMinus,
        handleTempoPlus,
        setShowRoman,
        setSpotSelected,
        refMidi,
    } = useProgression()

    const defaultColor = 'bg-slate-200/40 dark:bg-slate-500/20'
    const clickedColor = 'bg-blue-500/30 dark:bg-sky-400/30'   

  return (

    <SessionPage
        session={progressionSession}
        refMidi={refMidi}
    >

        {showStart &&
            <ProgressionsSettings handleStartClick={handleStartClick} />
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
                                <div onClick={() => handleGuessClick(chord)} key={chord['roman']} className={`${defaultColor} guess-btn`}>{showRoman ? chord['roman'] : chord['name']}</div>
                            )}
                        </div>
                    </div>
                    
                </div>
                <div className={`  absolute top-1/3 right-0  overflow-hidden`}>
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
                handleExtendClick={handleExtendClick}
            >
                <h1 className='text-xl font-montserrat text-center'>Your score</h1>
                <p className='fonst-montserrat text-lg'>{`Progressions: ${stats['sessionStats']['correct']}/${stats['sessionStats']['total']}`}</p>
                <p className='fonst-montserrat text-lg'>{`Chords: ${stats['chordTotalStats']['correct']}/${stats['chordTotalStats']['total']}`}</p>
                        
            </FinishModal>
        }
        
    </SessionPage>
  )
}

export default Progressions