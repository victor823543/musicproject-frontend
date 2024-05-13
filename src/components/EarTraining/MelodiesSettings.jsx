import { useState } from 'react'
import SessionPage from './components/SessionPage'
import SettingsContainer from './components/SettingsContainer'
import SettingsPage from './components/SettingsPage'

const MelodiesSettings = (props) => {
    const [clickedMelodies, setClickedMelodies] = useState(0)
    const [clickedStart, setClickedStart] = useState(0)
    const [clickedMelodyLength, setClickedMelodyLength] = useState('4')
    const [clickedLength, setClickedLength] = useState('10')
    const [clickedDifficulty, setClickedDifficulty] = useState(0)

   
    const melodies = ['Diatonic notes', 'All notes']
    const melodyStarts = ['Start on tonic', 'Start on random']
    const melodyLengths = ['3', '4', '5', '6', '7', '8']
    const sessionLengths = ['10', '20', '30', '50']
    const difficulties = ['Easy', 'Medium', 'Hard']

    const clickedColor = 'bg-sky-400/30 dark:bg-sky-400/40'
    const defaultColor = 'bg-amber-500/20 dark:bg-blue-500/20 hover:bg-sky-400/10 hover:dark:bg-sky-400/30'

    const handleMelodyClick = (melody) => {
        setClickedMelodies(melody)
    }

    const handleStartOptionClick = (index) => {
        setClickedStart(index)
    }

    const handleMelodyLengthClick = (index) => {
        setClickedMelodyLength(index)
    }

    const handleLengthClick = (length) => {
        setClickedLength(length)
    }

    const handleDifficultyClick = (index) => {
        setClickedDifficulty(index)
    }

    const handleStartClick = () => {

        const params = {
            'melodies_included': clickedMelodies,
            'start': clickedStart,
            'melody_length': clickedMelodyLength,
            'length': clickedLength,
            'difficulty': clickedDifficulty,
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
                    {melodyStarts.map((start, index) => 
                        <div key={start} onClick={() => handleStartOptionClick(index)} className={`${(clickedStart === index) ? clickedColor : defaultColor} modal-btn`}>{start}</div>
                    )}
                </SettingsContainer>,
                <SettingsContainer
                    title='Melody length'
                >
                    {melodyLengths.map((length) => 
                        <div key={length} onClick={() => handleMelodyLengthClick(length)} className={`${(clickedMelodyLength === length) ? clickedColor : defaultColor} modal-btn`}>{length}</div>
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
                    title='Difficulty'
                >
                    {difficulties.map((difficulty, index) => 
                        <div key={index} onClick={() => handleDifficultyClick(index)} className={`${(clickedDifficulty === index) ? clickedColor : defaultColor} modal-btn`}>{difficulty}</div>
                    )}
                </SettingsContainer>,
            ]}
            singleChildren={
                <SettingsContainer
                    title='Include notes'
                    type='single'
                >
                    {melodies.map((notes, index) => 
                        <div onClick={() => handleMelodyClick(index)} key={notes} className={`${clickedMelodies === index ? clickedColor : defaultColor} modal-btn max-xs:text-nowrap max-xs:overflow-hidden max-xs:text-ellipsis` }>
                            {notes}
                        </div>
                    )}
                </SettingsContainer>
            }
        />
    )
}

export default MelodiesSettings