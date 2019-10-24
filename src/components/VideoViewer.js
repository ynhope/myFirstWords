import React from "react"

function VideoViewer(videoUrlContainer) {

  return (
    <div className="video-json">Video-json
      {
        videoUrlContainer.length
        ?
        videoUrlContainer.map((list, index) => {
          return (
            <div className="video-json-list-container" key={index}>
              <div>{index + 1}.</div>
              <div>{list.link}</div>
              {/* <ReactPlayer url={list.link} playing width="600px" height="340px" />
              <div>isfamilyfriendly: {list.pagemap.videoobject[0].isfamilyfriendly}</div>
              <div>genre: {list.pagemap.videoobject[0].genre}</div> */}
              <div>name: {list.title}</div>
              <div>description: {list.snippet}</div>
              {/* <div>datepublished: {list.pagemap.videoobject[0].datepublished}</div>
              <div>uploaddate: {list.pagemap.videoobject[0].uploaddate}</div>
              <div>width: {list.pagemap.videoobject[0].width}</div>
              <div>height: {list.pagemap.videoobject[0].height}</div> */}
              <img src={list.pagemap.cse_image[0].src} width="300px" alt="cse_image_of_video"/>
            </div>
          )
        })
        :
        "No?"
      }
    </div>
  )
}

export default VideoViewer
