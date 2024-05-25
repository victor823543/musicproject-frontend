import MIDISounds from 'midi-sounds-react'
import dark_music_image from '../../../assets/images/dark-music-bg.jpeg'
import light_music_image from '../../../assets/images/light-music-bg.jpeg'

const SessionPage = ({children, session, refMidi}) => {
  return (

    <div className='w-screen h-screen  overflow-scroll hideScrollbar'>
        {/* Sound functionality */}
        {session &&
            <div className='hidden'>
                <MIDISounds 
                ref={refMidi}
                appElementName='root'
                instruments={[0]}
                
            />
            </div>
        }

        {/* Background */}
        <div style={{backgroundImage: `url(${light_music_image})`}} className='dark:hidden absolute inset-y-0 right-0 -z-30 bg-right max-lg:bg-center bg-cover bg-no-repeat w-full lg:w-3/5 h-full '></div>
        <div style={{backgroundImage: `url(${dark_music_image})`}} className='hidden dark:block absolute inset-y-0 right-0 -z-30 bg-right max-lg:bg-center bg-cover bg-no-repeat w-full lg:w-3/5 h-full'></div>
        <div className="absolute inset-y-0 right-0 w-full lg:w-3/5 bg-gradient-to-r from-white dark:from-black from-2% -z-20" />
        <div className='dark:lg:hidden fixed bg-cover inset-0 -z-10 backdrop-blur-sm'></div>
    
        <div className='fixed bg-cover inset-0 -z-40 bg-zinc-200 dark:bg-black'></div>



        {children}


    </div>
  )
}

export default SessionPage