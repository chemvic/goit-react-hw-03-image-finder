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




// async fetchImages() {
//   this.setState({ isLoading: true });
// const BASE_URL = "https://pixabay.com/api/";
//     const KEY = "34144660-7b9b8b2468352e1d4cb8415b4";
    
//     let url = `${BASE_URL}?key=${KEY}&q=${this.state.imagesForSearch}
//     &image_type=photo&orientation=horizontal&safesearch=true
//     &page=${this.state.currentPage}&per_page=12`;
    
//  try { 
//      const newImages = await axios.get(url)         
       
// this.setState(prevState => ({
//   images: [...prevState.images, ...newImages.data.hits],
// }));
// console.log(newImages.data.hits);
// this.setState({ isLoading: false });
//  return ;
//     }
// catch (error){console.log(error)} ;
// } 