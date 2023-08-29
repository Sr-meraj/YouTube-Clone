import React from 'react'
import { Link } from "react-router-dom";
import {abbreviateNumber} from 'js-abbreviation-number'
import {BsFillCheckCircleFill} from 'react-icons/bs'
import VideoLength from '../share/videoLength';

function VideoCard({video}) {
  return (
    <Link to={`/video/${video.videoId}`} >
      <div className="flex flex-col mb-8">
        <div className="relative h-50 md:h-40 lg:h-44 md:rounded-xl overflow-hidden">
          <img src={video?.thumbnails?.[0]?.url} alt="" className='h-full w-full object-cover' />
          {video.lengthSeconds && (
            <VideoLength time={video?.lengthSeconds}/>
          )}
        </div>

        <div className="flex text-black dark:text-white mt-3">
          <div className="flex items-start">
            <div className="flex h-9 w-9 rounded-full overflow-hidden">
              <img src={video.author.avatar[0]?.url} alt="" className='h-full w-full object-cover'/>
            </div>
          </div>
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className='text-sm font-bold line-clamp-2 text-black dark:text-white'>
              {video?.title}
            </span>
            <span className='text-[12px] font-semibold mt-2 text-black dark:text-white flex items-center'>
              {video?.author?.title}
              {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                <BsFillCheckCircleFill className='text-black/50 dark:text-white/50 text-[12px] ml-1'/>
              )}
            </span>

            <div className="flex text-[12px] font-semibold text-black/70 dark:text-white/70 truncate overflow-hidden">
              <span>
                {
                  video?.stats?.viewers ? 
                    `${abbreviateNumber(video?.stats?.viewers, 2)} views`
                    : 
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
      </div>
    </Link>
  )
}

export default VideoCard
