import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {useData} from '../context/contextApi'
import { fetchDataFromApi } from '../utilities/api'
import LeftNav from './LeftNav'
import SearchResultVideoCard from './SearchResultVideoCard'
import VideoCard from './VideoCard'


function SearchResult() {
  const [results, setResults] = useState([])
  const {searchQuery} = useParams()
  const {setLoading} = useData()

  useEffect(()=>{
    document.getElementById('root').classList.remove('custom-h');
    fetchSearchResults()
  },[searchQuery])

  const fetchSearchResults = ()=>{
    setLoading(true)
    fetchDataFromApi(`search/?q=${searchQuery}`).then(({contents})=>{
        console.log(contents);
        setResults(contents)
        setLoading(false)
    })
  }

  console.log(results);

  return (
    <div className='flex flex-row h-[calc(100%-56px)]'>
      <LeftNav/>

      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-white dark:bg-black ">
        <div className="grid grid-cols-1 gap-2 p-5">
          {
            results.map((item,index) => <SearchResultVideoCard key={index + item?.video?.videoId} video={item?.video} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SearchResult
