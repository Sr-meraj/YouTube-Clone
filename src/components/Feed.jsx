import React, { useEffect } from 'react'
import LeftNav from './LeftNav'
import { useData } from '../context/contextApi'
import VideoCard from './VideoCard'


function Feed() {
  const {loading, searchResults} = useData()

  useEffect(()=>{
    document.getElementById('root').classList.remove('custom-h')
  },[])

  console.log('searchResults',searchResults);


  return (
    <div className='flex flex-row h-[calc(100%-56px)]'>
      <LeftNav/>
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-white dark:bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {!loading && searchResults.map((item, index) => {

            if (item.type !== 'video') return false;


            return(
              <VideoCard key={index + item?.video?.videoId} video={item.video}/>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default Feed
