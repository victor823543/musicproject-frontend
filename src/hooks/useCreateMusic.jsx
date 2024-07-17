import { useState } from 'react'
import { DOMAIN, ACCESS_TOKEN } from '../constants'

const useCreateMusic = () => {
    const [params, setParams] = useState({ key: '', quality: 'Major', length: '1', additions: null})
    const [song, setSong] = useState(null)
    const [showChord, setShowChord] = useState([0])
    const [songAudio, setSongAudio] = useState(null)
    const [chordPlaying, setChordPlaying] = useState(null)
    const [audioTempo, setAudioTempo] = useState(2)
    const [showModal, setShowModal] = useState(false)
    const [showAudioModal, setShowAudioModal] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [chordReplacements, setChordReplacements] = useState(null)

    

    const fetchCreateSong = (paramsOut=params) => {
        const url = new URL(`${DOMAIN}/api/create/`)

        const headers = new Headers({
            'Content-Type': 'application/json',
        })

        const dataToSend = {
            'length': paramsOut['length'],
            'key': paramsOut['key'],
            'quality': paramsOut['quality'],
            'additions': paramsOut['additions'],
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
                setSong(data)
            })
            .catch(error => console.error('Error:', error))

    }

    const fetchTransposeSong = (paramsOut) => {
        const url = new URL(`${DOMAIN}/api/transpose/`)
        const headers = new Headers({
            'Content-Type': 'application/json',
        })

        const dataToSend = {
            'song': song['song'],
            'key': paramsOut['key'],
            'quality': paramsOut['quality'],
            'length': song['length'],
            'chords': song['chords'],
            'chord_objects': song['chord_objects'],
            'oldKey': song['key'],
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
                setSong(data)
            })
            .catch(error => console.error('Error', error))
    }

    const fetchSongAudio = (paramsOut) => {
        setShowAudioModal(false)
        setAudioTempo(paramsOut['tempo'])
        const url = new URL(`${DOMAIN}/api/audio/`)
        const headers = new Headers({
            'Content-Type': 'application/json'
        })

        const dataToSend = {
            'song': song['song'],
            'chords': song['chords'],
            'variation': paramsOut['variation'],
            'base': paramsOut['base'],
            'tempo': paramsOut['tempo']
        }

        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(dataToSend)
        }

        fetch(url, options)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                setSongAudio(url)
            })
            .catch(error => console.error('Error fetching MP3 file:', error))
        
    }

    const fetchStoreSong = () => {
        const url = new URL(`${DOMAIN}/api/songs/store/`)

        const token = localStorage.getItem(ACCESS_TOKEN)
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })

        const dataToSend = {
            'song': song,
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
            })
            .catch(error => console.error('Error:', error))
    }

    const changeChord = (targetVerse, targetChord, newChord) => {
        setSong((prev) => {
            const newSongObj = {
                ...prev['song'],
            }
            newSongObj[targetVerse][targetChord] = song['chord_objects'][newChord]

            return {...prev, 'song': newSongObj}
        })
    }

    const handleSelectKeyChange = (e) => {
        setParams((prev) => {
            return ({
                ...prev,
                key: e.target.value
            })
        })
    }

    const handleSelectQualityChange = (e) => {
        setParams((prev) => {
            return ({
                ...prev,
                quality: e.target.value
            })
        })
    }

    const handleSelectLengthChange = (e) => {
        setParams((prev) => {
            return ({
                ...prev,
                length: e.target.value
            })
        })
    }
    
    const handleCreateClick = (e) => {
        e.preventDefault()
        fetchCreateSong()
        
    }

    const handleCreateNewClick = (newParams) => {
        setParams(newParams)
        fetchCreateSong(newParams)
        setShowModal(false)
    }

    const handleTransposeClick = (newParams) => {
        setParams(newParams)
        fetchTransposeSong(newParams)
        setShowModal(false)
    }

    const handleChordClick = (c) => {
        if (!editMode) {
            setShowChord(song['chords'][c])
        } else {
            const chords = []
            for (let i=0; i<song['chord_objects'].length; i++) {
                if (!(song['chord_objects'][i]['name'][0] === c[0])) {
                    chords.push(song['chord_objects'][i])
                } else {
                    chords.push(null)
                }
            }
            setChordReplacements(chords)
        }
    }

    const handleProgress = state => {
        let secondsPlayed = state['playedSeconds']
        if (song['length'] * (6 - audioTempo) * 4 > secondsPlayed > 0) {
            let currentChord = Math.floor(secondsPlayed / (6 - audioTempo))
            setChordPlaying(currentChord)
            setShowChord(song['chords'][song['chordList'][currentChord]])
            console.log(currentChord)
        }
        
    }

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const toggleAudioModal = () => {
        setShowAudioModal(!showAudioModal)
    }
  return (
    {
        song,
        setSong,
        songAudio,
        showChord,
        showModal,
        showAudioModal,
        toggleModal,
        toggleAudioModal,
        chordPlaying,
        chordReplacements,
        editMode,
        setEditMode,
        changeChord,
        handleSelectKeyChange,
        handleCreateClick,
        handleSelectLengthChange,
        handleSelectQualityChange,
        handleChordClick,
        handleCreateNewClick,
        handleTransposeClick,
        handleProgress,
        fetchStoreSong,
        fetchSongAudio,
    }
  )
}

export default useCreateMusic