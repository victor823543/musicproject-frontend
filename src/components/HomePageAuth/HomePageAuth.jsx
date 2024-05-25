import image_dark_grand from '../../assets/images/dark_grand.jpeg'
import image_white_grand from '../../assets/images/white_grand.jpeg'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BarChart, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react'
import FullProgress from '../EarTraining/FullProgress'
import { ACCESS_TOKEN, DOMAIN } from '../../constants'
import ProgressStatsDisplay from './ProgressStatsDisplay'

const HomePageAuth = (props) => {
    const navigate = useNavigate()
    const [songs, setSongs] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [updateUI, setUpdateUI] = useState(false)
    const [stats, setStats] = useState(null)
    const [charts, setCharts] = useState(null)
    const [showFullProgress, setShowFullProgress] = useState(null)
    const [verticalLayout, setVerticalLayout] = useState(false)

    useEffect(() => {
        const handleResize = () => {
          // Update shouldAnimate based on screen width
          if (640 > window.innerWidth) {
            setVerticalLayout(true);
          } else {
            setVerticalLayout(false);
          }
        };
    
        // Initial check
        handleResize();
    
        // Listen to window resize events
        window.addEventListener('resize', handleResize);
    
        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchStats = () => {
            const url = new URL(`${DOMAIN}/api/userstats/`)
            const token = localStorage.getItem(ACCESS_TOKEN)

            fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.ok) {
                        response.json()
                        .then(data => {
                            console.log(data)
                            const newStats = {
                                'intervalSessionStats': data.intervalSessionStats,
                                'intervalProgressStats': data.intervalProgressStats,
                                'currentIntervalLevel': data.currentIntervalLevel,
                                'progressionSessionStats': data.progressionSessionStats,
                                'progressionProgressStats': data.progressionProgressStats,
                                'currentProgressionLevel': data.currentProgressionLevel,
                            }
                            setStats(newStats)
                            const newCharts = {
                                'intervalChart': data.intervalChart,
                            }
                            setCharts(newCharts)
                        })
                    } else {
                        console.log(response)
                    }
                })
                .catch(error => console.error('Error', error))
        }

        const fetchSongs = () => {
            const url = new URL(`${DOMAIN}/api/songs`)
            const token = localStorage.getItem(ACCESS_TOKEN)

            fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setSongs(data)
                })
                .catch(error => console.error('Error:', error))
        }

        fetchStats()
        fetchSongs()
        props.cancelSong()
    }, [updateUI])

    const fetchDeleteSong = (song_id) => {
        const url = new URL(`${DOMAIN}/api/songs/${song_id}/delete`)
        const token = localStorage.getItem(ACCESS_TOKEN)
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })

        const options = {
            method: 'DELETE',
            headers: headers,
        }

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete song')
                }
                console.log('Song deleted')
                setUpdateUI(!updateUI)
            })
            .catch(error => console.error('Error:', error))
    }

    const handleEditClick = () => {
        setEditMode(!editMode)
    }


    const dataFormatter = (number) =>
    Intl.NumberFormat('us').format(number).toString()

    return (
        <div className='h-screen w-screen flex flex-col items-center dark:text-slate-300 overflow-x-hidden hideScrollbar'>
            <div className='w-full min-h-20 bg-transparent'></div>
            <div style={{backgroundImage: `url(${image_white_grand})`}} className='dark:hidden fixed bg-cover inset-0 bg-center -z-20 '></div>
            <div style={{backgroundImage: `url(${image_dark_grand})`}} className='dark:block hidden fixed bg-cover inset-0 bg-center -z-20 '></div>
            <div className=' fixed bg-cover inset-0 -z-10 bg-gradient-to-br from-slate-100/60 to-sky-300  dark:from-black dark:to-sky-600/50 '></div>
            
            <h1 className='text-center text-3xl xs:text-4xl lg:text-5xl xl:text-7xl font-montserrat dark:font-light text-shadow-md shadow-sky-800/60 dark:text-shadow dark:shadow-sky-400 my-10'>Welcome {props.username}</h1>
            <div className='mt-10'>
                <p className='font-montserrat text-lg text-center'>Get started by creating a song or practicing eartraining</p>
                <div className='flex justify-evenly mt-4'>
                    <button onClick={() => navigate('/music')} className='btn-h'>Create music</button>
                    <button onClick={() => navigate('/eartraining')} className='btn-h'>Ear training</button>
                </div>
            </div>
            
            <div className='mt-10 w-full flex flex-col items-center'>
                <div className='relative px-2 max-xs:flex max-xs:flex-col max-xs:items-center'>
                    <p className='font-montserrat text-lg text-center'>Browse through your stored songs</p>
                    <div onClick={handleEditClick} className="xs:absolute xs:top-1/2 xs:-translate-y-1/2 xs:right-0 xs:translate-x-full cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                </div>
                
                <div className='relative w-5/6 flex justify-center '>
                   
                    <div className='bg-slate-700/20 flex gap-3 mt-4 max-xs:mt-1 py-4 px-2 overflow-x-scroll hideScrollbar'>
                        {songs.length ?
                            songs.map((song) => 
                            <div key={song.id} className='flex flex-col min-w-48'>
                                <div onClick={() => props.handleSongClick(song.song)} className='p-3 bg-slate-600/40 dark:bg-slate-700/40 hover:bg-amber-400/20 cursor-pointer hover:shadow-amber-700 shadow-md shadow-teal-600 dark:shadow-sky-400 font-montserrat font-light'>
                                    <p>{song.title ? song.title : 'Unnamed song'}</p>
                                    <p>{`Created: ${song.created}`}</p>
                                    <p>{`Key: ${song.song.key}`}</p>
                                </div>
                                {editMode && 
                                    <button onClick={() => fetchDeleteSong(song.id)} className='red-btn mt-2'>Delete</button>
                                }
                            </div>
                            
                            ) :
                            <p className='font-montserrat text-center'>You have no stored songs at the moment</p>
                        }
        
                    </div>
                    
                           
                    
                </div>
            </div>
            <div className='w-full mt-6'>
                <h1 className='text-center font-montserrat text-2xl mt-8'>Eartraining stats</h1>
                <div className='w-full px-6 max-sm:px-3'>
                    <TabGroup>
                        <TabList>
                            <Tab>Interval</Tab>
                            <Tab>Melody</Tab>
                            <Tab>Chord quality</Tab>
                            <Tab>Chord progression</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <p className='text-center font-montserrat font-light text-xl my-6 '>Interval results chart</p>

                                <div className='bg-slate-700/30 p-4 rounded-lg shadow-lg'>
                                   {charts ? 
                                        <BarChart 
                                            layout={verticalLayout ? 'vertical' : ''}
                                            stack
                                            className='mb-6 max-sm:h-[450px]'
                                            data={charts?.intervalChart}
                                            index='name'
                                            categories={[
                                                'correct',
                                                'wrong',
                                            ]}
                                            colors={['green-500', 'red-500']}
                                            valueFormatter={dataFormatter}
                                            yAxisWidth={48}
                                            showAnimation
                                        /> : 
                                        <p className='text-center mt-3'>No data available</p>
                                    } 
                                </div>
                                
                                <p className='text-center font-montserrat font-light text-xl my-6'>Interval progress mode</p>
                                {stats?.intervalProgressStats ? 
                                    <ProgressStatsDisplay
                                        type='interval'
                                        setShowFullProgress={setShowFullProgress}
                                        totalProgress={stats?.intervalProgressStats.totalStats.progressPercent}
                                        sessionProgress={stats?.intervalProgressStats.levelStats[stats?.currentIntervalLevel].bestScorePercent}
                                        currentLevel={parseInt(stats?.currentIntervalLevel)}
                                        levelInfoA={(level) => `Length: ${stats?.intervalProgressStats.levelStats[level.toString()].info.length}`}
                                        levelInfoB={(level) => `Width: ${stats?.intervalProgressStats.levelStats[level.toString()].info.width}`}
                                        currentSessionInfo={
                                            <>
                                            <div className='flex flex-wrap gap-4 text-sm font-light'>
                                                <p>{`Length: ${stats?.intervalProgressStats.levelStats[stats?.currentIntervalLevel].info.length}`}</p>
                                                <p>{`Width: ${stats?.intervalProgressStats.levelStats[stats?.currentIntervalLevel].info.width}`}</p>
                                            </div>
                                            <div className='flex gap-3'>
                                                <p className='text-sm'>Directions:</p>
                                                <p className='text-sm font-light'>{stats?.intervalProgressStats.levelStats[stats?.currentIntervalLevel].info.directions.map((direction, index) => index === stats?.intervalProgressStats.levelStats[stats?.currentIntervalLevel].info.directions.length - 1 ? direction : ` ${direction} - `)}</p>
                                            </div>
                                            <p className='text-base text-center mt-1'>Intervals</p>
                                            <p className='text-sm font-light text-center'>{stats?.intervalProgressStats.levelStats[stats?.currentIntervalLevel].info.interval_names.map((interval, index) => index === stats?.intervalProgressStats.levelStats[stats?.currentIntervalLevel].info.interval_names.length - 1 ? interval : ` ${interval} - `)}</p>
                                            </>
                                        }
                                    />
                                     : 
                                    <p className='text-center mt-3'>No data available</p>
                                }
                            </TabPanel>
                            <TabPanel>

                            </TabPanel>
                            <TabPanel>
                                
                            </TabPanel>
                            <TabPanel>
                            {stats?.progressionProgressStats ? 
                                    <ProgressStatsDisplay 
                                        type='progression'
                                        setShowFullProgress={setShowFullProgress}
                                        totalProgress={stats?.progressionProgressStats.totalStats.progressPercent}
                                        sessionProgress={stats?.progressionProgressStats.levelStats[stats?.currentProgressionLevel].bestScorePercent}
                                        currentLevel={parseInt(stats?.currentProgressionLevel)}
                                        levelInfoA={(level) => `Length: ${stats?.progressionProgressStats.levelStats[level.toString()].info.length}`}
                                        levelInfoB={(level) => `Progression length: ${stats?.progressionProgressStats.levelStats[level.toString()].info.progression_length}`}
                                        currentSessionInfo={
                                            <>
                                                <div className='flex flex-wrap gap-4 text-sm font-light'>
                                                    <p>{`Length: ${stats?.progressionProgressStats.levelStats[stats?.currentProgressionLevel].info.length}`}</p>
                                                    <p>{`Progression length: ${stats?.progressionProgressStats.levelStats[stats?.currentProgressionLevel].info.progression_length}`}</p>
                                                </div>
                                                <div className='flex gap-3'>
                                                    <p className='text-sm'>Directions:</p>
                                                    <p className='text-sm font-light'>{stats?.progressionProgressStats.levelStats[stats?.currentProgressionLevel].info.inversions.map((inversion, index) => index === stats?.progressionProgressStats.levelStats[stats?.currentProgressionLevel].info.inversions.length - 1 ? inversion : ` ${inversion} - `)}</p>
                                                </div>
                                            </>
                                        }
                                        verticalShrink
                                    /> :
                                    <p className='text-center mt-3'>No data available</p>
                                }
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                    
                </div>
            </div>
            {showFullProgress === 'interval' && <FullProgress type='interval' levelStats={stats?.intervalProgressStats.levelStats} current={stats?.currentIntervalLevel} close={() => setShowFullProgress(false)}/>}
            {showFullProgress === 'progression' && <FullProgress type='progression' levelStats={stats?.progressionProgressStats.levelStats} current={stats?.currentProgressionLevel} close={() => setShowFullProgress(false)}/>}
        </div>
    )
}

export default HomePageAuth