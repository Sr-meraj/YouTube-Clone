import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../utilities/api'
import { useData } from '../context/contextApi';
import ReactPlayer from 'react-player';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { abbreviateNumber } from 'js-abbreviation-number';
import SuggestionVideoCard from './SuggestionVideoCard';

function VideoDetails() {
  const [video, setVideo] = useState()
  const [relatedVideos, setRelatedVideos] = useState([])
  const {setLoading} = useData()
  const {id} = useParams()

  useEffect(()=>{
    document.getElementById('root').classList.add('custom-h');
    fetchVideoDetails()
    fetchVideoRelatedContent()
  },[id])
  const fetchVideoDetails = ()=>{
    fetchDataFromApi(`video/details/?id=${id}`).then(res =>{
      console.log(res);
      setLoading(true)
      setVideo(res)
      setLoading(false)
    })
  }
  const fetchVideoRelatedContent = ()=>{
    fetchDataFromApi(`video/related-contents/?id=${id}`).then(res =>{
      console.log(res);
      setLoading(true)
      setRelatedVideos(res)
      setLoading(false)
    })
  }
  return (
    <div className='flex justify-center flex-row h-[calc(100%-56px)] bg-white dark:bg-black'>
      <div className="w-full max-w-4xl lg:max-w-7xl flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">

          <div className=" h-[200px] md:h-[400px] lg:h-[550px] -ml-4 lg:ml-0 -mr-4 lg:mr-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width={"100%"}
              height={"100%"}
              className='dark:bg-black bg-white'
              playing={true}
            />
          </div>

          <div className="">
              <h2 className="text-dark dark:text-white font-bold text-sm md:text-xl line-clamp-2 mt-4">
                {video?.title}
              </h2>
          </div>

          <div className="flex justify-between items-center flex-row mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img src={video?.author?.avatar[0]?.url} alt={video?.author?.title} className='w-full h-full object-cover' />
                </div>
              </div>

              <div className="flex flex-col ml-3">
                  <div className='text-[12px] font-semibold text-black dark:text-white flex items-center'>
                    {video?.author?.title}
                    {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                      <BsFillCheckCircleFill className='text-black/50 dark:text-white/50 text-[12px] ml-1'/>
                    )}
                  </div>

                  <div className="text-black/70 dark:text-white/70 text-sm">
                    {video?.author?.stats?.subscribersText}
                  </div>
              </div>
              <button type="button" class="py-3 px-4 ml-4 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 focus:outline-none focus:ring-2 dark:focus:ring-slate-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                  Subscribe
              </button>
            </div>
            <div className="flex text-black dark:text-white mt-4 md:mt-0">
              {/* <div className="flex items-center justify-center cursor-pointer h-11 px-6 rounded-3xl bg-white/[0.15]">
                <AiOutlineLike className='text-xl text-white mr-2'/>
                <span>
                  {`${abbreviateNumber(video?.stats?.likes,2)} Likes`}
                </span>
              </div> */}
               <span class="inline-flex overflow-hidden rounded-full border border-[#303030] bg-white/[0.15] shadow-sm">
                <button
                  class="flex items-center border-e border-gray-500 px-4 py-2 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50/20 focus:relative"
                >
                    <AiOutlineLike className='text-xl text-black dark:text-white mr-2'/>
                    {`${abbreviateNumber(video?.stats?.likes,2)}`}
                </button>

                <button
                  class="inline-block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-50/20 focus:relative"
                  title="View Orders"
                >
                  <AiOutlineDislike className='text-xl text-black dark:text-white mr-2'/>
                </button>
              </span>
              <div className="flex items-center justify-center cursor-pointer ml-4  px-6 py-3 rounded-3xl text-black dark:text-white bg-slate-400/20 ">
                <span>
                  {`${abbreviateNumber(video?.stats?.views,2)} Views`}
                </span>
              </div>

              <button type="button" class="py-3 px-4 ml-4 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold bg-slate-400/20 shadow-sm text-black dark:text-white hover:bg-slate-400/50 dark:hover:bg-[#303030]/[0.6] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                <svg height="22" viewBox="0 0 24 24" width="22" focusable="false" className='dark:fill-white fill-black' style={{pointerEvents: 'none', display: 'block', width: "100%", height: "100%",}}><path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z"></path></svg>
                Share
              </button>
              
             

            </div>

          </div>

        </div>


        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          {
            relatedVideos?.contents?.map((item, index)=>{
              if (item?.type !== 'video') return false;
              return (
                <SuggestionVideoCard key={index} video={item?.video}/>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default VideoDetails
