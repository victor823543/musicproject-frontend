import image_grand_piano from '../../assets/images/white_grand.jpeg'
import image_dark_piano from '../../assets/images/dark_grand.jpeg'

const MusicPageForm = (props) => {
    const keys = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'Db', 'Eb', 'Gb', 'Ab', 'Bb']
    return (
        <div className='fixed h-screen w-screen flex max-lg:justify-center max-lg:items-center'>
            <div style={{backgroundImage: `url(${image_grand_piano})`}} className="dark:hidden max-lg:absolute max-lg:bg-cover max-lg:inset-0 -z-10 bg-center bg-auto w-full lg:w-1/2"></div>
            <div style={{backgroundImage: `url(${image_dark_piano})`}} className="dark:block hidden max-lg:absolute max-lg:bg-cover max-lg:inset-0 -z-10 bg-center bg-auto w-full lg:w-1/2"></div>
            <div className='absolute w-full h-full bg-zinc-200 dark:bg-gradient-to-br dark:from-black dark:to-slate-800 inset-0 -z-20'></div>
            <div className='h-full flex flex-col justify-center lg:mx-auto max-lg:bg-zinc-200/90 dark:max-lg:bg-sky-600/20 max-lg:backdrop-blur-sm max-lg:shadow-2xl max-lg:h-fit max-lg:py-10 max-lg:px-14 max-lg:rounded-lg'>
                <form className='flex flex-col font-montserrat gap-4'>
                <label className='teal-label'>Pick a key</label>
                <select className="teal-select" onChange={props.onSelectKeyChange}>
                    <option value="">Randomize</option>
                    {keys.map((key, index) => (
                        <option key={index} value={key}>{key}</option>
                    ))}
                </select>
                <label className='teal-label'>Pick a length</label>
                <select className="teal-select" onChange={props.onSelectLengthChange}>
            
                    <option value="1">1 Verse</option>
                    <option value="2">2 Verses</option>
                    <option value="3">3 Verses</option>
                    <option value="4">4 Verses</option>
                </select>
                <label className='teal-label'>Pick quality</label>
                <select className="teal-select" onChange={props.onSelectQualityChange}>
                    <option value="Major">Major</option>
                    <option value="Minor">Minor</option>
                </select>
                <div className='flex justify-center'>
                    <button type='submit' className='text-2xl sm:text-3xl lg:text-xl bg-sky-600/50 dark:bg-sky-400/50 hover:bg-sky-600/40 dark:hover:bg-sky-500/50 hover:scale-110 transition-all ring-1 dark:ring-2 rounded-md shadow-md ring-sky-800 dark:ring-sky-600 text-zinc-50 dark:text-sky-100 w-fit py-2 px-4' onClick={props.onCreateClick}>Create Song</button>
                </div>
                
            </form>
            </div>
            
        
        </div>
        
    )
}

export default MusicPageForm