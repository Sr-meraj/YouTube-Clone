import moment from 'moment'
import React from 'react'

const VideoLength = ({time}) => {
    const videoLengthInSeconds = moment().startOf('day').seconds(time).format('H:mm:ss')
  return (
    <div>
      <div className=" absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-sm rounded-md">
        {videoLengthInSeconds}
      </div>
    </div>
  )
}

export default VideoLength
