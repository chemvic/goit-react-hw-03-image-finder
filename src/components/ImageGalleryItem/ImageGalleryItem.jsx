import PropTypes from 'prop-types';
import css from "./ImageGalleryItem.module.css";
import React from 'react';


const ImageGalleryItem=({ webformatURL, largeImageURL, tags, onClick})=>{

    return(
        <div onClick={()=>onClick(largeImageURL,tags)} className={css.imageGalleryItem}> 
               <img src={webformatURL} alt={tags}  className={css.imageGalleryItemImage}/>
</div>
   
    )
}

ImageGalleryItem.propTypes={
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default ImageGalleryItem;