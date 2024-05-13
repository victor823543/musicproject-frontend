import { useState, useEffect, useRef } from "react"
import { DOMAIN, ACCESS_TOKEN } from '../constants'
import { fetchUpdateProgress } from "../utils/functions"


const useProgression = (progressMode=false) => {
    const refMidi = useRef()
    const [currentSettings, setCurrentSettings] = useState({})
    const [showStart, setShowStart] = useState(true)
    const [showMain, setShowMain] = useState(false)
    const [progressionSession, setProgressionSession] = useState(null)
    const [progress, setProgress] = useState(0)
    const [result, setResult] = useState({0: 0})
    const [guess, setGuess] = useState([])
    const [score, setScore] = useState(0)
    const [chordScore, setChordScore] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    const [stats, setStats] = useState({})
    const [totalCompleted, setTotalCompleted] = useState(0)
    const [passedprogression, setPassedprogression] = useState({'chords': [], 'visible': false, 'triggered': true})
    const [showRoman, setShowRoman] = useState(true)
    const [spotSelected, setSpotSelected] = useState(0)
    const [sessionLength, setSessionLength] = useState(0)
    const [progLength, setProgLength] = useState(4)
    const [chordNames, setChordNames] = useState([])
    const [tempo, setTempo] = useState(2)
    const [startRandom, setStartRandom] = useState(false)
    const [playingReference, setPlayingReference] = useState(false)

    useEffect(() => {
        if (progressMode) {
            fetchprogressionSession()
        }
    }, [])

    useEffect(() => {
        if (!passedprogression['triggered']) {
            const timeout = setTimeout(() => {
            setPassedprogression(prev => {
                return {...prev, 'visible': !prev['visible'], 'triggered': true}
            })
        }, 1500)

        return () => clearTimeout(timeout)
        }
        
    }, [passedprogression])


    const fetchprogressionSession = (paramsOut) => {
        if (progressMode) {
            const url = new URL(`${DOMAIN}/api/progression/progress/`)
            const token = localStorage.getItem(ACCESS_TOKEN)

            fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProgressionSession(data)
                setProgLength(parseInt(data['progression_length']))
                setSessionLength(parseInt(data['length']))
                setStartRandom(data['start'] === 'Start on random')
                setResult(Object.fromEntries(
                    Array.from({ length: parseInt(data['length']) }, (_, index) => [index, 0])
                    ))
                setChordNames(data['chord_names'][0])
            })
            .catch(error => console.error('Error:', error))
        } else {  
            setCurrentSettings(paramsOut)
            setProgLength(parseInt(paramsOut['progression_length']))
            setSessionLength(parseInt(paramsOut['length']))

            if (paramsOut['start']) {
                setStartRandom(true)
            }

            const resObj = Object.fromEntries(
                    Array.from({ length: parseInt(paramsOut['length']) }, (_, index) => [index, 0])
                    )
            setResult(resObj)


            const url = new URL(`${DOMAIN}/api/progression/`)

            const headers = new Headers({
                'Content-Type': 'application/json',
            })

            const dataToSend = {
                'progressions_included': paramsOut['progressions_included'],
                'start': paramsOut['start'],
                'progression_length': paramsOut['progression_length'],
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
                    
                    setProgressionSession(data)
                    setChordNames(data['chord_names'][0])
                    console.log(data['chord_names'][0])
                    
                })
                .catch(error => console.error('Error:', error))
        }

    }

    const fetchUpdateStats = (progressStats) => {

        const url = new URL(`${DOMAIN}/api/update/stats/`)

        const token = localStorage.getItem(ACCESS_TOKEN)
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })

        const dataToSend = {
            'type': 'progression',
            'sessionStats': null,
            'progressStats': progressStats,
        }

        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(dataToSend)
        }

        fetch(url, options)
            .then(response => console.log(response))
            .catch(error => console.error('Error:', error))

    }


    const handleStartClick = (params) => {
        if (!progressMode) {
            fetchprogressionSession(params)
        }
        setShowStart(false)
        setShowMain(true)
    }

    const handleContinueClick = () => {

        if (progress === sessionLength) {
            
            console.log('finished')
            atFinish()
        }

        if (progress) {
            const current = progress - 1

            const chords = []
            let correctAmmount = 0
            for (let i=0; i<progLength; i++) {
                const chord = {
                    'name': progressionSession['progressions'][current][i]['name'],
                    'roman': progressionSession['progressions'][current][i]['roman'],
                }
                if (guess[i]['roman'] === progressionSession['progressions'][current][i]['roman']) {
                    chord['correct'] = true
                    correctAmmount++
                    setChordScore(prev => prev + 1)
                }
                chords.push(chord)
            }

            const passed = {
                'chords': chords,
                'visible': true,
                'triggered': false,
            }
            
            if (correctAmmount === progLength) {
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
            setPassedprogression(passed)
        } else {
            refMidi.current.setMasterVolume(0.5)
        }
        if (!(progress === sessionLength)) {
            playprogression(progressionSession['progressions'][progress], progressionSession['chord_names'][progress][0]['numbers'])
            setGuess([])
            setChordNames(progressionSession['chord_names'][progress])
            setProgress(prev => prev + 1)    
            
        }
    }

        
    const atFinish = () => {
        const current = progress - 1

        let finalChordScore = chordScore
        let correctAmmount = 0
            for (let i=0; i < progLength; i++) {
                if (guess[i]['roman'] === progressionSession['progressions'][current][i]['roman']) {
                    correctAmmount++
                    finalChordScore++
                }
            }

        if (correctAmmount === progLength) {
            var finalScore = score + 1
        } else {
            var finalScore = score
        }

        if (progressMode) {
            const progressStats = {
                'result': finalScore,
                'level': progressionSession?.level
            }
            fetchUpdateStats(progressStats)
        }

        getStats(finalScore, finalChordScore)
        setProgress(0)
        setGuess([])
        setIsFinished(true)

    }

    const handleAgainClick = () => {
        playprogression(progressionSession['progressions'][progress - 1], chordNames[0]['numbers'])
    }

    const handleGuessClick = (chord) => {
        if (guess.length < progLength) {
            setGuess(prev => [...prev, chord])
        } else if (spotSelected) {
            setGuess(prev => {
                const newGuessList = [...prev]
                newGuessList[spotSelected - 1] = chord
                return newGuessList
            })
        }
    }

    const getStats = (finalScore, finalChordScore) => {
        
        if (progressMode) {
            var sessionStats = {
                'correct': finalScore,
                'total': sessionLength,
                'percent': Math.ceil((finalScore / sessionLength) * 100),
                'moveOn': Math.ceil((finalScore / sessionLength) * 100) >= 100,
            }
            if (sessionStats.moveOn) {
                fetchUpdateProgress('progression')
            }
        } else {
            var sessionStats = {
                'correct': finalScore,
                'total': sessionLength + totalCompleted,
            }
        }
        

        const chordTotalStats = {
            'correct': finalChordScore,
            'total': (sessionLength + totalCompleted) * progLength
        }

        setStats({
            'sessionStats': sessionStats,
            'chordTotalStats': chordTotalStats,
        })

        if (!progressMode) {
            setTotalCompleted(sessionStats['total'])
        }
    }

    const handleExtendClick = (newSettings) => {
        if (newSettings) {
            setShowMain(false)
            setShowStart(true)
            setIsFinished(false)
        } else {
            fetchprogressionSession(currentSettings)
            setIsFinished(false)
        }
    }

    const handleRestartClick = (newSettings) => {
        if (newSettings || progressMode) {
            setScore(0)
            setShowMain(false)
            setShowStart(true)
            setIsFinished(false)
            if (progressMode) {
                fetchprogressionSession
            }
        } else {
            setScore(0)
            fetchprogressionSession(currentSettings)
            setIsFinished(false)
        }
    }

    const handleTempoMinus = () => {
        setTempo(prev => Math.min(4, (prev + 0.5)))
    }

    const handleTempoPlus = () => {
        setTempo(prev => Math.max(1, (prev - 0.5)))
    }

    const handlePlayingReference = () => {
        setPlayingReference(true)
        setTimeout(() => {
            setPlayingReference(false)
            
        }, 2500)
    }

    const playprogressionPart = (progression, index) => {
        let time = refMidi.current.contextTime()
        if (startRandom) {
            time += 3
        }
        for (let i=0; i<progression.length; i++) {
            refMidi.current.playChordAt(time + (index * tempo), 0, [progression[i]], tempo) 
        }
    }
    const playprogression = (progression, current) => {
        console.log(progression)
        if (startRandom) {
           playReference(current) 
        }
        for (let i=0; i<progression.length; i++) {
            playprogressionPart(progression[i]['numbers'], i)
        }
    }

    const playReference = (chord) => {
        handlePlayingReference()
        const time = refMidi.current.contextTime()
        refMidi.current.playChordAt(time, 0, chord, 2)
    }


  return (
    {
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
        refMidi
    }
  )
}

export default useProgression