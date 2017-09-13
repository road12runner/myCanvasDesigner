import React from 'react';


const  GalleryImage = ({img, onSelectImage}) => {
  return (
    <img className='gallery-image' src={img.LargeImage} onClick={(e) => onSelectImage({id: img.Id, url: img.LargeImage})}/>
  )
};

export default GalleryImage;