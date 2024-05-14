import { useState, useEffect, useRef } from 'react'
import { ACCESS_TOKEN, DOMAIN } from '../constants'
import { fetchUpdateProgress } from '../utils/functions'


const useInterval = (progressMode=false) => {
  const refMidi = useRef()

  const [currentSettings, setCurrentSettings] = useState({})
  const [showStart, setShowStart] = useState(true)
  const [showMain, setShowMain] = useState(false)
  const [intervalSession, setIntervalSession] = useState(null)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState({0: 0})
  const [intervalNames, setIntervalNames] = useState([])
  const [guess, setGuess] = useState('')
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [stats, setStats] = useState({})
  const [storedStats, setStoredStats] = useState(null)
  const [totalCompleted, setTotalCompleted] = useState(0)
  const [passedInterval, setPassedInterval] = useState({'name': '', 'correct': true, 'visible': false, 'triggered': true})

  useEffect(() => {
    if (progressMode) {
      fetchIntervalSession()
    }
}, [])

  useEffect(() => {
      if (!passedInterval['triggered']) {
          const timeout = setTimeout(() => {
          setPassedInterval(prev => {
              return {...prev, 'visible': !prev['visible'], 'triggered': true}
          })
      }, 1500)

      return () => clearTimeout(timeout)
      }
      
  }, [passedInterval])

  const fetchIntervalSession = (paramsOut) => {
      if (progressMode) {
        const url = new URL(`${DOMAIN}/api/interval/progress/`)
        const token = localStorage.getItem(ACCESS_TOKEN)

        fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setIntervalNames(data['interval_names'])
                setIntervalSession(data)
                setResult(Object.fromEntries(
                    Array.from({ length: parseInt(data['length']) }, (_, index) => [index, 0])
                    ))
            })
            .catch(error => console.error('Error:', error))
      } else {

        setCurrentSettings(paramsOut)
        setIntervalNames(paramsOut['interval_names'])

        const resObj = Object.fromEntries(
                Array.from({ length: parseInt(paramsOut['length']) }, (_, index) => [index, 0])
                )
        setResult(resObj)

        const url = new URL(`${DOMAIN}/api/interval/`)

        const headers = new Headers({
            'Content-Type': 'application/json',
        })

        const dataToSend = {
            'intervals': paramsOut['intervals'],
            'directions': paramsOut['directions'],
            'width': paramsOut['width'],
            'length': paramsOut['length'],
            'progression': paramsOut['progression'],
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
                
                setIntervalSession(data)
                
            })
            .catch(error => console.error('Error:', error))
      }
  }
  
  const fetchUpdateStats = (intervalStats, progressStats=null) => {
      const interval_length = Object.keys(intervalSession['intervals']).length
      const paramsOut = {}
      intervalNames.forEach(interval => {
          paramsOut[interval] = {'correct': 0, 'total': 0} 
      })
      for (let i=0; i<interval_length; i++) {
          paramsOut[intervalSession['intervals'][i]['name']]['total'] += 1
          if (intervalStats[i] === 1) {
              paramsOut[intervalSession['intervals'][i]['name']]['correct'] += 1
          }
          
      }

      const url = new URL(`${DOMAIN}/api/update/stats/`)
      const token = localStorage.getItem(ACCESS_TOKEN)
      const headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      })

      const dataToSend = {
          'type': 'interval',
          'sessionStats': paramsOut,
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
        fetchIntervalSession(params)
      }
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
              'name': intervalSession['intervals'][current]['name'],
              'visible': true,
              'triggered': false,
          }
          
          if (guess === intervalSession['intervals'][current]['name']) {
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
          setPassedInterval(passed)
      } else {
          refMidi.current.setMasterVolume(0.5)
      }
      if (!(progress === Object.keys(result).length)) {
          playInterval(intervalSession['intervals'][progress]['numbers'])
          setGuess('')
          setProgress(prev => prev + 1)    
      }
      
      
      
  }

      
  const atFinish = () => {
      const current = progress - 1
      if (guess === intervalSession['intervals'][current]['name']) {
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
      if (progressMode) {
        const progressStats = {
          'result': finalScore,
          'level': intervalSession?.level
        }
        fetchUpdateStats(finalResult, progressStats)
      } else {
        fetchUpdateStats(finalResult)
      }
      
      getStats(finalScore, finalResult)
      setProgress(0)
      setGuess('')
      setIsFinished(true)

  }

  const handleAgainClick = () => {
      playInterval(intervalSession['intervals'][progress - 1]['numbers'])
  }

  const handleGuessClick = (interval) => {
      setGuess(interval)
  }

  const getStats = (finalScore, finalResult) => {
      if (!progressMode && storedStats) {
          var intervalStats = storedStats
      } else {
          var intervalStats = {}
      }
      
      intervalNames.forEach(interval => {
          if (!(intervalStats.hasOwnProperty(interval))) {
              intervalStats[interval] = {'correct': 0, 'total': 0} 
          }
      })
      const interval_length = Object.keys(intervalSession['intervals']).length
      for (let i = 0; i < interval_length; i++) {
          intervalStats[intervalSession['intervals'][i]['name']]['total'] += 1
          if (finalResult[i] === 1) {
              intervalStats[intervalSession['intervals'][i]['name']]['correct'] += 1
          }            
      }
      
      if (progressMode) {
        var sessionStats = {
          'correct': finalScore,
          'total': interval_length,
          'percent': Math.ceil((finalScore / interval_length) * 100),
          'moveOn': Math.ceil((finalScore / interval_length) * 100) >= 100,
        }
        if (sessionStats.moveOn) {
          fetchUpdateProgress('interval')
        }
      } else {
        var sessionStats = {
          'correct': finalScore,
          'total': interval_length + totalCompleted,
        }
      }
      

      setStats({
          'intervalStats': intervalStats,
          'sessionStats': sessionStats,
      })

      if (!progressMode) {
        setStoredStats(intervalStats)
        setTotalCompleted(sessionStats['total'])
      }
  }

  const handleExtendClick = (newSettings) => {
      if (newSettings) {
          setShowMain(false)
          setShowStart(true)
          setIsFinished(false)
      } else {
          fetchIntervalSession(currentSettings)
          setIsFinished(false)
      }
  }

  const handleRestartClick = (newSettings) => {
      if (progressMode) {
          setScore(0)
          setShowMain(false)
          setShowStart(true)
          setIsFinished(false)
          fetchIntervalSession()
      } else {
        if (newSettings) {
            setScore(0)
            setStoredStats(null) 
            setTotalCompleted(0)
            setShowMain(false)
            setShowStart(true)
            setIsFinished(false)
        } else {
            setScore(0)
            setStoredStats(null)
            fetchIntervalSession(currentSettings)
            setIsFinished(false)
        }
      }
  }


  const playIntervalPart = (interval, index) => {
      console.log(interval)
      console.log(index)
      const time =  refMidi.current.contextTime()
      for (let i=0; i<interval.length; i++) {
          refMidi.current.playChordAt(time + index, 0, [interval[i]], 1) 
      }
           
      
      console.log(time)
  }
  const playInterval = (interval) => {
      console.log(interval)
      for (let i=0; i<interval.length; i++) {
          playIntervalPart(interval[i], i)
      }
  }
  return (
    {
      showStart,
      showMain,
      isFinished,
      intervalSession,
      intervalNames,
      passedInterval,
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

export default useInterval