import React from "react"

function ImageViewer(imageUrlContainer) {

  return (
    <div className="image-json">Image-json
      {
        imageUrlContainer.length
        ?
        imageUrlContainer.map((list, index) => {
          return (
            <div className="image-json-list-container" key={index}>
              <p>
                <div>{index + 1}. {list.link}</div>
                <img src={list.link} width="300px" alt="image_url_by_cse"/>
              </p>
            </div>
          )
        })
        :
        "No?"
      }
    </div>
  )
}

export default ImageViewer
