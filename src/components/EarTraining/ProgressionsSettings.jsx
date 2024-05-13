import { useState } from 'react'
import SettingsPage from './components/SettingsPage'
import SettingsContainer from './components/SettingsContainer'

const ProgressionsSettings = (props) => {
    const [clickedProgressions, setClickedProgressions] = useState(0)
    const [clickedStart, setClickedStart] = useState(0)
    const [clickedProgLength, setClickedProgLength] = useState('4')
    const [clickedLength, setClickedLength] = useState('10')
    const [clickedInversion, setClickedInversion] = useState({
        1: false,
        2: false,
    })

   
    const progressions = ['Basic', 'All diatonic', '+ Sevenths']
    const chordStarts = ['Start on tonic', 'Start on random']
    const progressionLengths = ['2', '3', '4', '5', '6']
    const sessionLengths = ['10', '20', '30', '50']
    const inversions = ['First inversion', 'Second inversion']
    const clickedColor = 'bg-sky-400/30 dark:bg-sky-400/40'
    const defaultColor = 'bg-amber-500/20 dark:bg-blue-500/20 hover:bg-sky-400/10 hover:dark:bg-sky-400/30'

    const handleProgClick = (prog) => {
        setClickedProgressions(prog)
    }

    const handleStartOptionClick = (index) => {
        setClickedStart(index)
    }

    const handleProgLengthClick = (index) => {
        setClickedProgLength(index)
    }

    const handleLengthClick = (length) => {
        setClickedLength(length)
    }

    const handleInversionClick = (index) => {
        setClickedInversion({
            ...clickedInversion,
            [index]: !clickedInversion[index],
        })
    }

    const handleStartClick = () => {
        const inversions_out = Object.keys(clickedInversion).filter(key => clickedInversion[key])

        const params = {
            'progressions_included': clickedProgressions,
            'start': clickedStart,
            'progression_length': clickedProgLength,
            'length': clickedLength,
            'inversions': inversions_out,
        }
        
        props.handleStartClick(params)
    }

    return (
        <SettingsPage 
            handleStartClick={handleStartClick}
            gridChildren={[
                <SettingsContainer
                    title='Start at'
                >
                    {chordStarts.map((start, index) => 
                        <div key={start} onClick={() => handleStartOptionClick(index)} className={`${(clickedStart === index) ? clickedColor : defaultColor} modal-btn`}>{start}</div>
                    )}
                </SettingsContainer>,
                <SettingsContainer
                    title='Progression length'
                >
                    {progressionLengths.map((length) => 
                        <div key={length} onClick={() => handleProgLengthClick(length)} className={`${(clickedProgLength === length) ? clickedColor : defaultColor} modal-btn`}>{length}</div>
                    )}
                </SettingsContainer>,
                <SettingsContainer
                    title='Session length'
                >
                    {sessionLengths.map((length) => 
                        <div key={length} onClick={() => handleLengthClick(length)} className={`${(clickedLength === length) ? clickedColor : defaultColor} modal-btn`} >{length}</div>
                    )}
                </SettingsContainer>,
                <SettingsContainer
                    title='Inversions'
                >
                    {inversions.map((inversion, index) => 
                        <div key={inversion} onClick={() => handleInversionClick(index + 1)} className={`${(clickedInversion[index + 1]) ? clickedColor : defaultColor} modal-btn`}>{inversion}</div>
                    )}
                </SettingsContainer>
            ]}
            singleChildren={
                <SettingsContainer
                    title='Include progressions'
                    type='single'
                >
                    {progressions.map((prog, index) => 
                        <div onClick={() => handleProgClick(index)} key={prog} className={`${clickedProgressions === index ? clickedColor : defaultColor} modal-btn max-xs:text-nowrap max-xs:overflow-hidden max-xs:text-ellipsis` }>
                            {prog}
                        </div>
                    )}
                </SettingsContainer>
            }
        />
    )
}

export default ProgressionsSettings