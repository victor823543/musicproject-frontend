import { useState } from 'react'
import SettingsPage from './components/SettingsPage'
import SettingsContainer from './components/SettingsContainer'

const ChordsSettings = (props) => {
    const [clickedChords, setClickedChords] = useState({
        0: true,
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
    })
    const [clickedStyle, setClickedStyle] = useState(0)
    const [clickedScope, setClickedScope] = useState(0)
    const [clickedLength, setClickedLength] = useState('10')
    const [clickedInversion, setClickedInversion] = useState({
        1: false,
        2: false,
    })

   
    const chords = ['Major', 'Minor', 'Diminished', 'Augmented', 'Major seventh', 'Minor seventh', 'Dominant seventh', 'Major sixth', 'Minor sixth', 'Suspended second', 'Suspended fourth']
    const chordStyles = ['Unison', 'Arpeggio']
    const octaveScopes = ['4', '3-5', '2-6']
    const sessionLengths = ['10', '20', '30', '50']
    const inversions = ['First inversion', 'Second inversion']
    const clickedColor = 'bg-sky-400/30 dark:bg-sky-400/40'
    const defaultColor = 'bg-amber-500/20 dark:bg-blue-500/20 hover:bg-sky-400/10 hover:dark:bg-sky-400/30'

    const handleChordClick = (chord) => {
        setClickedChords({
            ...clickedChords,
            [chord]: !clickedChords[chord],
        })
    }

    const handleStyleClick = (index) => {
        setClickedStyle(index)
    }

    const handleScopeClick = (index) => {
        setClickedScope(index)
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
        const chords_out = Object.keys(clickedChords).filter(key => clickedChords[key])
        const inversions_out = Object.keys(clickedInversion).filter(key => clickedInversion[key])
        const chordNames = Array.from(chords_out, (n, _) => chords[n])

        const params = {
            'chords_included': chords_out,
            'style': clickedStyle,
            'width': clickedScope,
            'length': clickedLength,
            'inversions': inversions_out,
            'chord_names': chordNames,
        }
        
        props.handleStartClick(params)
    }

    return (
        <SettingsPage 
            handleStartClick={handleStartClick}
            gridChildren={[
                <SettingsContainer
                    title='Style'
                >
                    {chordStyles.map((style, index) => 
                        <div key={style} onClick={() => handleStyleClick(index)} className={`${(clickedStyle === index) ? clickedColor : defaultColor} modal-btn`}>{style}</div>
                    )}
                </SettingsContainer>,
                <SettingsContainer
                    title='Octave scope'
                >
                    {octaveScopes.map((scope, index) => 
                        <div key={index} onClick={() => handleScopeClick(index)} className={`${(clickedScope === index) ? clickedColor : defaultColor} modal-btn`}>{scope}</div>
                    )}
                </SettingsContainer>,
                <SettingsContainer
                    title='Something'
                >
                    {inversions.map((inversion, index) => 
                        <div key={inversion} onClick={() => handleInversionClick(index + 1)} className={`${(clickedInversion[index + 1]) ? clickedColor : defaultColor} modal-btn`}>{inversion}</div>
                    )}
                </SettingsContainer>,
                <SettingsContainer
                    title='Session length'
                >
                    {sessionLengths.map((length) => 
                        <div key={length} onClick={() => handleLengthClick(length)} className={`${(clickedLength === length) ? clickedColor : defaultColor} modal-btn`} >{length}</div>
                    )}
                </SettingsContainer>
            ]}
            singleChildren={
                <SettingsContainer
                    title='Include Chords'
                    type='single'
                >
                    {chords.map((chord, index) => 
                        <div onClick={() => handleChordClick(index)} key={chord} className={`${clickedChords[index] ? clickedColor : defaultColor} modal-btn max-xs:text-nowrap max-xs:overflow-hidden max-xs:text-ellipsis` }>
                            {chord}
                        </div>
                    )}
                </SettingsContainer>
            }
        />
    )
}

export default ChordsSettings