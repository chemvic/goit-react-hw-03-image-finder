import React,{Component} from 'react';
import PropTypes from 'prop-types';
import css from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem";
import Button from "../Button";
import Loader from '../Loader';
import imagesAPI from "../../api/fetchImages-api";


class ImageGallery extends Component {

  state={
    images:[],
    currentPage: 1,
    isLoading:false,

  };

  async componentDidUpdate(prevProps, _) { 
    
    if(prevProps.imagesForSearch !== this.props.imagesForSearch){
     
      this.setState({ isLoading: true });
      this.setState({images:[]});
      this.setState({currentPage:1});
      this.fetchImages();       

}
}

    loadMoreImages =() => {
    
        this.setState(
        (prevState) => ({ currentPage: prevState.currentPage + 1 }),()=>this.fetchImages()       
      );
     };

    fetchImages=async()=>{
      const {currentPage}=this.state;
      this.setState({ isLoading: true });
      try {const newImages= await imagesAPI.fetchImagesWithQuery(this.props.imagesForSearch, currentPage);
        this.setState(prevState => ({
            images: [...prevState.images, ...newImages.data.hits],
          }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  

  render(){
const{images, isLoading}=this.state;

    return(<>
  
        <ul className={css.imageGallery}>
    
			{images.map(({ id, webformatURL, largeImageURL, tags }) => (
      <li  key={id} className={css.imageGalleryItem}>
        <ImageGalleryItem  webformatURL={webformatURL}
         largeImageURL={largeImageURL}
          tags={tags}
           onClick={()=>this.props.onSelect(largeImageURL, tags)}/></li>
            ))}
</ul> 
 {(isLoading) &&
      (<Loader visible={true}/>)}
{(images.length>0)&&
<Button onClick={this.loadMoreImages}/>}


 </>
 
    )
  }

}

 ImageGallery.propTypes={
    onSelect: PropTypes.func.isRequired,
    imagesForSearch: PropTypes.string.isRequired,
    
} 

export default ImageGallery;
