import MelodiesSettings from './MelodiesSettings'
import PianoEarTraining from './components/PianoEarTraining'
import { useResizeDetector } from 'react-resize-detector'
import SessionPage from './components/SessionPage'
import FinishModal from './components/FinishModal'
import useMelody from '../../hooks/useMelody'

const Melodies = () => {

    const { width, height, ref } = useResizeDetector()
    const {
            showStart,
            showMain,
            isFinished,
            playingReference,
            melodySession,
            keysIncluded,
            correctNote,
            wrongNote,
            startNote,
            result,
            stats,
            guess,
            progress,
            handleStartClick,
            handleAgainClick,
            handleContinueClick,
            handlePianoClick,
            handleRestartClick,
            handleExtendClick,
            handleTempoMinus,
            handleTempoPlus,
            refMidi,
        } = useMelody()
   



  return (

    <SessionPage
        session={melodySession}
        refMidi={refMidi}
    >
        {showStart &&
            <MelodiesSettings handleStartClick={handleStartClick} />
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
                    <h1 className='h1-et'>Listen to the melody</h1>
                    <button onClick={handleContinueClick} className='py-2 px-4 max-xs:py-1 max-xs:px-3 text-lg max-xs:text-sm max-sm:text-base dark:text-sky-200 font-montserrat bg-sky-500/40 dark:bg-blue-900/80 ring-2 ring-sky-700 dark:ring-blue-500 rounded-md shadow-lg mb-4 max-xs:mb-2'>{progress ? 'Continue' : 'Start'}</button>
                    <button onClick={handleAgainClick} className={`py-2 px-4 max-xs:py-1 max-xs:px-3 text-lg max-xs:text-sm max-sm:text-base dark:text-sky-200 font-montserrat bg-sky-500/40 dark:bg-blue-900/80 ring-2 ring-sky-700 dark:ring-blue-500 rounded-md shadow-lg ${!progress && 'hidden'}`}>Listen again</button>
                </div>

                <h1 className='h1-et max-sm:px-6 mt-10'>Take a guess</h1>
                <div className='flex flex-col py-4 sm:px-10 w-full md:w-3/4 flex-grow mx-auto max-w-[1000px] bg-slate-700/10'>
                    
                    
                    <div ref={ref} style={{position: 'relative'}} className=' h-full'>
                        {<PianoEarTraining onClick={handlePianoClick} start={60} end={83} pianoW={width} highlighted={keysIncluded} guess={guess} startNote={startNote} correctNote={correctNote} wrongNote={wrongNote} />}
                    </div>
                    
                </div>
                <div className={`  absolute top-1/3 max-sm:top-1/4 max-xs:top-2/3 right-0  overflow-hidden`}>
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
                    </div>
                </div>
                
                {playingReference && 
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-400/30 dark:bg-slate-700/40 p-5'>
                        <p className='text-xl font-montserrat dark:text-white text-center' >
                            Playing reference chord - tonic
                        </p>
                    </div>
                }

                

            </div>
        }
        {isFinished &&
            <FinishModal
                handleRestartClick={handleRestartClick}
                handleExtendClick={handleExtendClick}
            >
                <h1 className='text-xl font-montserrat text-center'>Your score</h1>
                <p className='fonst-montserrat text-lg'>{`Melodies: ${stats['sessionStats']['correct']}/${stats['sessionStats']['total']}`}</p>
                <p className='fonst-montserrat text-lg'>{`Notes: ${stats['noteTotalStats']['correct']}/${stats['noteTotalStats']['total']}`}</p>
                
            </FinishModal>
        }
        
    </SessionPage>
  )
}

export default Melodies