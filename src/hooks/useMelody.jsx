import { useState, useRef } from 'react'
import { DOMAIN } from '../constants'

const useMelody = () => {
    const refMidi = useRef()
    const [currentSettings, setCurrentSettings] = useState({})
    const [showStart, setShowStart] = useState(true)
    const [showMain, setShowMain] = useState(false)
    const [melodySession, setMelodySession] = useState(null)
    const [progress, setProgress] = useState(0)
    const [result, setResult] = useState({0: 0})
    const [guess, setGuess] = useState([])
    const [score, setScore] = useState(0)
    const [noteScore, setNoteScore] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    const [stats, setStats] = useState({})
    const [totalCompleted, setTotalCompleted] = useState(0)
    const [passedMelody, setPassedMelody] = useState([])
    const [sessionLength, setSessionLength] = useState(0)
    const [melodyLength, setMelodyLength] = useState(4)
    const [keysIncluded, setKeysIncluded] = useState([])
    const [tempo, setTempo] = useState(2)
    const [startRandom, setStartRandom] = useState(false)
    const [playingReference, setPlayingReference] = useState(false)
    const [startNote, setStartNote] = useState(null)
    const [correctNote, setCorrectNote] = useState(null)
    const [wrongNote, setWrongNote] = useState(null)
    const [allowContinue, setAllowContinue] = useState(true)


    const fetchMelodySession = (paramsOut) => {
        setCurrentSettings(paramsOut)
        setMelodyLength(parseInt(paramsOut['melody_length']))
        setSessionLength(parseInt(paramsOut['length']))

        if (paramsOut['start']) {
            setStartRandom(true)
        }

        const resObj = Object.fromEntries(
                Array.from({ length: parseInt(paramsOut['length']) }, (_, index) => [index, 0])
                )
        setResult(resObj)


        const url = new URL(`${DOMAIN}/api/melody/`)

        const headers = new Headers({
            'Content-Type': 'application/json',
        })

        const dataToSend = {
            'melodies_included': paramsOut['melodies_included'],
            'start': paramsOut['start'],
            'melody_length': paramsOut['melody_length'],
            'length': paramsOut['length'],
            'difficulty': paramsOut['difficulty'],
        }

        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(dataToSend)
        }

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                
                setMelodySession(data)
                setKeysIncluded(data['melodies'][0]['all_notes'])
                
            })
            .catch(error => console.error('Error:', error))

    }

    const handleStartClick = (params) => {
        fetchMelodySession(params)
        setShowStart(false)
        setShowMain(true)
    }

    const pauseExecution = (milliseconds) => {
        return new Promise((resolve) => {
          setTimeout(resolve, milliseconds);
        });
      };
    
    const showAnswer = (passed) => {
        console.log(passed)
        for (let i=0; i<passed.length; i++) {
            setTimeout(() => {
                if (passed[i]['correct']) {
                    setCorrectNote(passed[i]['number'][0])
                } else {
                    setWrongNote(passed[i]['number'][0])
                }
                setTimeout(() => {
                    setCorrectNote(null)
                    setWrongNote(null)
                }, 400)
            }, i*500)
        }
    }

    const handleContinueClick = async () => {
        if (allowContinue) {
            setAllowContinue(false)
            if (progress === sessionLength) {
                
                console.log('finished')
                atFinish()
            }
    
            if (progress) {
    
                const current = progress - 1
    
                const notes = []
                let correctAmmount = 0
                for (let i=0; i<melodyLength; i++) {
                    const note = {
                        'number': melodySession['melodies'][current]['numbers'][i],
                    }
    
                    if (guess[i] === melodySession['melodies'][current]['numbers'][i][0]) {
                        note['correct'] = true
                        correctAmmount++
                        setNoteScore(prev => prev + 1)
                    }
                    notes.push(note)
                }
    
                const passed = notes
                
                if (correctAmmount === melodyLength) {
                    var cor = true
                } else {
                    var cor = false
                }
                
                if (cor) {
                    setResult(prev => {
                        return {
                            ...prev,
                            [current]: 1
                        }
                    })
                    setScore(prev => prev + 1)
                } else {
                    setResult(prev => {
                        return {
                            ...prev,
                            [current]: 2
                        }
                    })
                }
                setPassedMelody(passed)
    
                showAnswer(passed)
                await pauseExecution((500 * melodyLength) + 1000)
                setCorrectNote(null)
                setWrongNote(null)
    
            } else {
                refMidi.current.setMasterVolume(0.5)
            }
            if (!(progress === sessionLength)) {
                playMelody(melodySession['melodies'][progress])
                setStartNote(melodySession['melodies'][progress]['numbers'][0][0])
                setGuess([])
                setKeysIncluded(melodySession['melodies'][progress]['all_notes'])
                setProgress(prev => prev + 1)    
                
            }
        }
        
    }

        
    const atFinish = () => {
        const current = progress - 1
        console.log(current)
        let finalNoteScore = noteScore
        let correctAmmount = 0
            for (let i=0; i < melodyLength; i++) {
                if (guess[i] === melodySession['melodies'][current]['numbers'][i][0]) {
                    correctAmmount++
                    finalNoteScore++
                }
            }

        if (correctAmmount === melodyLength) {
            var finalScore = score + 1
        } else {
            var finalScore = score
        }
        getStats(finalScore, finalNoteScore)
        setProgress(0)
        setGuess([])
        setIsFinished(true)

    }

    const handleAgainClick = () => {
        playMelody(melodySession['melodies'][progress - 1])
    }

    const handlePianoClick = (note) => {
        if (guess.length < melodyLength) {
            setGuess(prev => [...prev, note])
            if (guess.length === 0) {
                setStartNote(null)
            }
            if (guess.length === melodyLength - 1) {
                setAllowContinue(true)
            }
        }
    }

    const getStats = (finalScore, finalNoteScore) => {
        
        const sessionStats = {
            'correct': finalScore,
            'total': sessionLength + totalCompleted,
        }
        const noteTotalStats = {
            'correct': finalNoteScore,
            'total': (sessionLength + totalCompleted) * melodyLength
        }

        setStats({
            'sessionStats': sessionStats,
            'noteTotalStats': noteTotalStats,
        })

        setTotalCompleted(sessionStats['total'])
    }

    const handleExtendClick = (newSettings) => {
        if (newSettings) {
            setShowMain(false)
            setShowStart(true)
            setIsFinished(false)
        } else {
            fetchMelodySession(currentSettings)
            setIsFinished(false)
        }
    }

    const handleRestartClick = (newSettings) => {
        if (newSettings) {
            setScore(0)
            setShowMain(false)
            setShowStart(true)
            setIsFinished(false)
        } else {
            setScore(0)
            fetchMelodySession(currentSettings)
            setIsFinished(false)
        }
    }

    const handleTempoMinus = () => {
        setTempo(prev => Math.min(4, (prev + 0.5)))
    }

    const handleTempoPlus = () => {
        setTempo(prev => Math.max(1, (prev - 0.5)))
    }

    const playMelodyPart = (melody, index) => {
        let time = refMidi.current.contextTime()
        
        for (let i=0; i<melody.length; i++) {
            refMidi.current.playChordAt(time + (index * tempo), 0, [melody[i]], tempo) 
        }
    }
    const playMelody = (melody) => {
        console.log(melody)
        
        for (let i=0; i<melody['numbers'].length; i++) {
            playMelodyPart(melody['numbers'][i], i)
        }
    }
  return (
    {
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
    }
  )
}

export default useMelody