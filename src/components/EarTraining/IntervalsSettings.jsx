import { useState } from 'react'
import SettingsPage from './components/SettingsPage'
import SettingsContainer from './components/SettingsContainer'

const IntervalsSettings = (props) => {
    const [clickedIntervals, setClickedIntervals] = useState({
        1: true, 
        2: true, 
        3: true, 
        4: true,
        5: true, 
        6: true, 
        7: true, 
        8: true, 
        9: true, 
        10: true, 
        11: true, 
        12: true
    })
    const [clickedDirections, setClickedDirections] = useState({
        'Up': true,
        'Down': false,
        'Unison': false,
        'Random': false,
    })
    const [clickedScope, setClickedScope] = useState(0)
    const [clickedLength, setClickedLength] = useState('10')
    const [clickedProgression, setClickedProgression] = useState('Slow')

   
    const intervals = ['Minor second', 'Major second', 'Minor third', 'Major third', 'Perfect fourth', 'Tritone', 'Perfect fifth', 'Minor sixth', 'Major sixth', 'Minor seventh', 'Major seventh', 'Octave']
    const octaveScopes = ['4', '3-5', '2-6']
    const sessionLengths = ['10', '20', '30', '50']
    const difProgression = ['None', 'Slow', 'Fast']
    const clickedColor = 'bg-sky-400/30 dark:bg-sky-400/40'
    const defaultColor = 'bg-amber-500/20 dark:bg-blue-500/20 hover:bg-sky-400/10 hover:dark:bg-sky-400/30'

    const handleIntervalClick = (interval) => {
        setClickedIntervals({
            ...clickedIntervals,
            [interval]: !clickedIntervals[interval],
        })
    }

    const handleDirectionClick = (dir, bool) => {
        if ((dir === 'Random') && (!bool)) {
            setClickedDirections({
                'Up': false,
                'Down': false,
                'Unison': false,
                'Random': true,
            })
        } else {
            setClickedDirections({
            ...clickedDirections,
            [dir]: !bool,
            'Random': false,
        })
        }
        
    }

    const handleScopeClick = (index) => {
        setClickedScope(index)
    }

    const handleLengthClick = (length) => {
        setClickedLength(length)
    }

    const handleProgressionClick = (progressionRate) => {
        setClickedProgression(progressionRate)
    }

    const handleStartClick = () => {
        const intervals_out = Object.keys(clickedIntervals).filter(key => clickedIntervals[key])
        const directions = Object.keys(clickedDirections).filter(key => clickedDirections[key])

        const intervalNames = Array.from(intervals_out, (n, _) => intervals[n - 1])

        const params = {
            'intervals': intervals_out,
            'directions': directions,
            'width': clickedScope,
            'length': clickedLength,
            'progression': clickedProgression,
            'interval_names': intervalNames,
        }
        
        props.handleStartClick(params)
    }
    return (
        <SettingsPage 
            handleStartClick={handleStartClick}
            gridChildren={[
                <SettingsContainer
                    title='Directions'
                >
                    {Object.entries(clickedDirections).map(([direction, bool]) => 
                        <div key={direction} onClick={() => handleDirectionClick(direction, bool)} className={`${bool ? clickedColor : defaultColor} modal-btn`}>{direction}</div>
                    )}
                </SettingsContainer>,
                <SettingsContainer
                    title='Octave Scope'
                >
                    {octaveScopes.map((scope, index) => 
                        <div key={index} onClick={() => handleScopeClick(index)} className={`${(clickedScope === index) ? clickedColor : defaultColor} modal-btn`}>{scope}</div>
                    )}
                </SettingsContainer>,
                <SettingsContainer
                    title='Session Length'
                >
                    {sessionLengths.map((length) => 
                        <div key={length} onClick={() => handleLengthClick(length)} className={`${(clickedLength === length ? clickedColor : defaultColor)} modal-btn`} >{length}</div>
                    )}
                </SettingsContainer>,
                <SettingsContainer
                    title='Something'
                >
                    {difProgression.map((rate) => 
                        <div key={rate} onClick={() => handleProgressionClick(rate)} className={`${(clickedProgression === rate) ? clickedColor : defaultColor} modal-btn`}>{rate}</div>
                    )}
                </SettingsContainer>
            ]}
            singleChildren={
                <SettingsContainer
                    title='Include Intervals'
                    type='single'
                >
                    {intervals.map((interval, index) => 
                        <div onClick={() => handleIntervalClick(index + 1)} key={interval} className={`${clickedIntervals[index + 1] ? clickedColor : defaultColor} modal-btn max-xs:text-nowrap max-xs:overflow-hidden max-xs:text-ellipsis` }>
                            {interval}
                        </div>
                    )}
                </SettingsContainer>
            }
        />
    )
}

export default IntervalsSettings