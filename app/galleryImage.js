import React, {Component} from 'react';


const  GalleryImage = ({img, onSelectImage}) => {
  console.log('gallery image', img, img.LargeImage);
  return (
    <img className='gallery-image' src={img.LargeImage} onClick={(e) => onSelectImage({id: img.Id, url: img.LargeImage})}/>
  )
};

export default GalleryImage;