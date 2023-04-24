import React from 'react';
import PropTypes from 'prop-types';
import css from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem";



const ImageGallery =({images, onOpenModal})=> {

    return(
  
      <ul className={css.imageGallery}>
    
			{images.map(({ id, webformatURL, largeImageURL, tags }) => (
      <li  key={id} className={css.imageGalleryItem}>
        <ImageGalleryItem  webformatURL={webformatURL}
         largeImageURL={largeImageURL}
          tags={tags}
           onClick={onOpenModal}/></li>
            ))}
      </ul> 
    )
  

}

 ImageGallery.propTypes={
  onOpenModal: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired
    
} 

export default ImageGallery;
