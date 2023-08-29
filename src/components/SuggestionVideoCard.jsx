import { abbreviateNumber } from 'js-abbreviation-number'
import React from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import VideoLength from '../share/videoLength'



function SuggestionVideoCard({video}) {
  return (
    <Link to={`/video/${video.videoId}`} >
      <div className="flex mb-3">
        <div className="relative h-24 lg:20 xl:24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-sky-800 overflow-hidden">
          <img src={video?.thumbnails?.[0]?.url} alt="" className='h-full w-full object-cover' />
          {video.lengthSeconds && (
            <VideoLength time={video?.lengthSeconds}/>
          )}
        </div>
        <div className="flex flex-col ml-3 overflow-hidden">
            <span className='text-sm font-bold line-clamp-2 text-black dark:text-white'>
              {video?.title}
            </span>
            <span className='text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2 text-black dark:text-white flex items-center'>
              {video?.author?.title}
              {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                <BsFillCheckCircleFill className='text-white/50 text-[12px] lg:text-[10px] xl:text-[12px] ml-1'/>
              )}
            </span>

            <div className="flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold text-black/70 dark:text-white/70 truncate overflow-hidden">
              <span>
                {
                  `${abbreviateNumber(video?.stats?.views, 2)} views`
                }
              </span>

              <span className='flex text-[24px] leading-none font-bold text-black/70 dark:text-white/70 relative top-[-10px] mx-1'>
                .
              </span>
              <span className='truncate'>
                {video?.publishedTimeText}
              </span>
            </div>
          </div>
      </div>
    </Link>
  )
}

export default SuggestionVideoCard
