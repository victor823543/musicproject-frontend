import MusicPageChords from './MusicPageChords'
import MusicPageForm from './MusicPageForm'
import MusicPageOptions from './MusicPageOptions'
import MusicPageKeyboard from './MusicPageKeyboard'
import MusicPageAudio from './MusicPageAudio'
import { useEffect } from 'react'
import useCreateMusic from '../../hooks/useCreateMusic'

const MusicPage = ({isAuthenticated, sentSong}) => {
    const {
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
        } = useCreateMusic()

    useEffect(() => {
        if (sentSong) {
            setSong(sentSong)
        }

    }, [])
    return (
        <div className={`${song && 'bg-mp'} min-h-screen flex flex-col justify-center items-center`}>
            
                {!song  && <MusicPageForm 
                    onSelectKeyChange={handleSelectKeyChange} 
                    onCreateClick={handleCreateClick} 
                    onSelectLengthChange={handleSelectLengthChange}
                    onSelectQualityChange={handleSelectQualityChange}
                /> }
                {song && 
                <>
                {editMode &&
                    <div className='absolute top-0 left-0 inset-0 w-full h-full bg-zinc-800 bg-opacity-50 z-10 pt-20 pb-4'></div>
                }
                {/* For bigger than sm device width */}
                <div className='w-full h-full flex max-lg:flex-col max-sm:hidden mt-28 mb-6 dark:text-sky-200/80'>
                    <div className='w-full h-20 lg:hidden'></div>
                    <div className='absolute w-full h-full bg-zinc-200 inset-0 -z-20'></div>
                    <div className='lg:w-1/2 h-full flex flex-col justify-between'>
                        <MusicPageChords song={song} handleChordClick={handleChordClick} chordPlaying={chordPlaying} changeChord={changeChord} editMode={editMode} handleEditClick={() => setEditMode(!editMode)} chordReplacements={chordReplacements}/>
                        {isAuthenticated && <button onClick={fetchStoreSong} className='btn-s w-fit mx-auto mb-2 relative bottom-5'>Store Song</button>}
                        <MusicPageOptions song={song} handleCreateClick={handleCreateNewClick} handleTransposeClick={handleTransposeClick}/>
                    </div>
                    <div className='lg:w-1/2'>
                        <MusicPageKeyboard showChord={showChord}/>
                        <MusicPageAudio audio={songAudio} handleGetAudioClick={fetchSongAudio} handleProgress={handleProgress}/>
                    </div>
                    
                </div>

                {/* For smaller than sm device width */}
                <div className='w-full h-full flex flex-col dark:text-sky-200/80 sm:hidden'>
                    <div className='absolute w-screen h-screen bg-zinc-200 inset-0 -z-20'></div>
                    <div className='w-full h-20 lg:hidden'></div>
                    {showModal && 
                        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-zinc-800 bg-opacity-50 z-30 pt-20 pb-4'>
                            <div className='bg-zinc-200 dark:bg-slate-700 max-h-full xsPlus:px-8 py-8 rounded-lg shadow-md overflow-scroll'>
                                <MusicPageOptions song={song} handleCreateClick={handleCreateNewClick} handleTransposeClick={handleTransposeClick} />
                                <button className='bg-red-300 border-2 border-red-500 px-4 py-2 rounded-md mt-4 text-black font-light ml-4' onClick={toggleModal}>Close</button>
                            </div>
                            
                        </div>
                    }
                    {showAudioModal && 
                        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-zinc-800 bg-opacity-50 z-30 pt-20 pb-4'>
                            <div className='bg-zinc-200 dark:bg-slate-700 max-h-full xsPlus:px-8 py-8 rounded-lg shadow-md overflow-scroll'>
                                <MusicPageAudio audio={songAudio} handleGetAudioClick={fetchSongAudio} handleProgress={handleProgress} inModal={true}/>    
                                <button className='bg-red-300 border-2 border-red-500 px-4 py-2 rounded-md mt-4 text-black font-light ml-4' onClick={toggleAudioModal}>Close</button>
                            </div>
                            
                        </div>
                    }
                    
    
                    <div className='h-full flex flex-col justify-between mb-4'>

                        

                        <MusicPageChords song={song} handleChordClick={handleChordClick} chordPlaying={chordPlaying} changeChord={changeChord} editMode={editMode} handleEditClick={() => setEditMode(!editMode)} chordReplacements={chordReplacements}/>
                        <div className='flex justify-center'>
                            <button className='btn-s w-fit' onClick={toggleModal}>Change song</button>
                        </div>
                        
                        <MusicPageKeyboard showChord={showChord}/>
                        <div className='flex justify-center'>
                            <button className='btn-s w-fit' onClick={toggleAudioModal}>Generate audio</button>
                        </div>
                        
                        <MusicPageAudio audio={songAudio} handleGetAudioClick={fetchSongAudio} handleProgress={handleProgress}/>
                    </div>
                    
                    
                </div>
                </>
                
                }
            
            
        </div>
    )
}

export default MusicPage