import { useRef, useState, useEffect } from 'react'
import { DOMAIN } from '../constants'

const useChord = () => {
    const refMidi = useRef()
    const [currentSettings, setCurrentSettings] = useState({})
    const [showStart, setShowStart] = useState(true)
    const [showMain, setShowMain] = useState(false)
    const [chordSession, setChordSession] = useState(null)
    const [progress, setProgress] = useState(0)
    const [result, setResult] = useState({0: 0})
    const [chordNames, setChordNames] = useState([])
    const [guess, setGuess] = useState('')
    const [score, setScore] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    const [stats, setStats] = useState({})
    const [storedStats, setStoredStats] = useState(null)
    const [totalCompleted, setTotalCompleted] = useState(0)
    const [passedChord, setPassedChord] = useState({'name': '', 'correct': true, 'visible': false, 'triggered': true})

    useEffect(() => {
        if (!passedChord['triggered']) {
            const timeout = setTimeout(() => {
            setPassedChord(prev => {
                return {...prev, 'visible': !prev['visible'], 'triggered': true}
            })
        }, 1500)

        return () => clearTimeout(timeout)
        }
        
    }, [passedChord])

    const fetchChordSession = (paramsOut) => {
        setCurrentSettings(paramsOut)
        setChordNames(paramsOut['chord_names'])

        const resObj = Object.fromEntries(
                Array.from({ length: parseInt(paramsOut['length']) }, (_, index) => [index, 0])
                )
        setResult(resObj)

        const url = new URL(`${DOMAIN}/api/chord/`)

        const headers = new Headers({
            'Content-Type': 'application/json',
        })

        const dataToSend = {
            'chords_included': paramsOut['chords_included'],
            'style': paramsOut['style'],
            'width': paramsOut['width'],
            'length': paramsOut['length'],
            'inversions': paramsOut['inversions'],
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
                
                setChordSession(data)
                
            })
            .catch(error => console.error('Error:', error))

    }

    const handleStartClick = (params) => {
        fetchChordSession(params)
        setShowStart(false)
        setShowMain(true)
    }

    const handleContinueClick = () => {
        if (progress === Object.keys(result).length) {
            
            console.log('finished')
            atFinish()
        } 

        if (progress) {
            const current = progress - 1

            const passed = {
                'name': chordSession['chords'][current]['name'],
                'visible': true,
                'triggered': false,
            }
            
            if (guess === chordSession['chords'][current]['name']) {
                passed['correct'] = true
                setResult(prev => {
                    return {
                        ...prev,
                        [current]: 1
                    }
                })
                setScore(prev => prev + 1)
            } else {
                passed['correct'] = false
                setResult(prev => {
                    return {
                        ...prev,
                        [current]: 2
                    }
                })
            }
            setPassedChord(passed)
        } else {
            refMidi.current.setMasterVolume(0.5)
        }
        if (!(progress === Object.keys(result).length)) {
            playChord(chordSession['chords'][progress]['numbers'])
            setGuess('')
            setProgress(prev => prev + 1)    
        }
        
        
        
    }

        
    const atFinish = () => {
        const current = progress - 1
        if (guess === chordSession['chords'][current]['name']) {
            var finalResult = {
                ...result,
                [current]: 1,
            }
            var finalScore = score + 1
        } else {
            var finalResult = {
                ...result,
                [current]: 2,
            }
            var finalScore = score
        }
        getStats(finalScore, finalResult)
        setProgress(0)
        setGuess('')
        setIsFinished(true)

    }

    const handleAgainClick = () => {
        playChord(chordSession['chords'][progress - 1]['numbers'])
    }

    const handleGuessClick = (chord) => {
        setGuess(chord)
    }

    const getStats = (finalScore, finalResult) => {
        if (storedStats) {
            var chordStats = storedStats
        } else {
            var chordStats = {}
        }
        
        chordNames.forEach(chord => {
            if (!(chordStats.hasOwnProperty(chord))) {
                chordStats[chord] = {'correct': 0, 'total': 0} 
            }
        })
        const chord_length = Object.keys(chordSession['chords']).length
        for (let i = 0; i < chord_length; i++) {
            chordStats[chordSession['chords'][i]['name']]['total'] += 1
            if (finalResult[i] === 1) {
                chordStats[chordSession['chords'][i]['name']]['correct'] += 1
            }            
        }
        
        const sessionStats = {
            'correct': finalScore,
            'total': chord_length + totalCompleted,
        }

        setStats({
            'chordStats': chordStats,
            'sessionStats': sessionStats,
        })

        setStoredStats(chordStats)

        setTotalCompleted(sessionStats['total'])
    }

    const handleExtendClick = (newSettings) => {
        if (newSettings) {
            setShowMain(false)
            setShowStart(true)
            setIsFinished(false)
        } else {
            fetchChordSession(currentSettings)
            setIsFinished(false)
        }
    }

    const handleRestartClick = (newSettings) => {
        if (newSettings) {
            setScore(0)
            setStoredStats(null)
            setShowMain(false)
            setShowStart(true)
            setIsFinished(false)
        } else {
            setScore(0)
            setStoredStats(null)
            fetchChordSession(currentSettings)
            setIsFinished(false)
        }
    }


    const playChordPart = (chord, index) => {
        console.log(chord)
        console.log(index)
        const time =  refMidi.current.contextTime()
        for (let i=0; i<chord.length; i++) {
            refMidi.current.playChordAt(time + index, 0, [chord[i]], 1) 
        }
             
        
        console.log(time)
    }
    const playChord = (chord) => {
        console.log(chord)
        for (let i=0; i<chord.length; i++) {
            playChordPart(chord[i], i)
        }
    }
  return (
    {
        showStart,
        showMain,
        isFinished,
        chordSession,
        chordNames,
        passedChord,
        result,
        stats,
        guess,
        progress,
        handleStartClick,
        handleAgainClick,
        handleContinueClick,
        handleGuessClick,
        handleRestartClick,
        handleExtendClick,
        refMidi,
    }
  )
}

export default useChord