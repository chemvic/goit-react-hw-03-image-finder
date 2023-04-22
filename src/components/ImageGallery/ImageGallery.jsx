import React,{Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import css from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem";
import Button from "../Button";
import Loader from '../Loader';
import imagesAPI from "../../api/fetchImages-api";
class ImageGallery extends Component {

  state={
    images:[],
    imagesForSearch:'',
    currentPage: 1,
    isLoading:false,

  };

  async componentDidUpdate(prevProps, prevState) { 
    const {imagesForSearch, currentPage}=this.state;
    
    if(prevProps.imagesForSearch !== this.props.imagesForSearch){
      this.setState({ isLoading: true });
      this.setState({imagesForSearch: this.props.imagesForSearch});
      this.setState({images:[]});
      this.setState({currentPage:1});
      // this.fetchImages(); 

     
// =====================================================================||prevState.currentPage!==this.state.currentPage
// GET c помощью вінесенного сервиса api

try {const newImages= await imagesAPI.fetchImagesWithQuery(imagesForSearch, currentPage);
  this.setState(prevState => ({
      images: [...prevState.images, ...newImages.data.hits],
    }));
} catch (error) {
  this.setState({ error });
} finally {
  this.setState({ isLoading: false });
}
}
// ===========================================================

}


  

 

    // handleImageClick = event => {
    //   // Обработчик клика на изображение
    //   if (event.target.nodeName !== 'IMG') {
    //     // Если клик был не на изображении, то выходим из функции
    //     return;
    //   }

    //   const largeImageURL = "https://pixabay.com/get/g98b80cfda27f15db185136f31543eb7b5244ca0f0279a68443b114875b9c85d59aa1e7ff31c390d2b9337a148e83ae5b5f83d0bc822fa6bb01478eedf5907919_1280.jpg"; // Получаем адрес большого изображения
    //   this.props.onSelect(largeImageURL);
    //   console.log(largeImageURL); // Вызываем функцию из родительского компонента для открытия модального окна
    // };

    loadMoreImages = async () => {
      const {imagesForSearch, currentPage}=this.state;
      this.setState(
        (prevState) => ({ currentPage: prevState.currentPage + 1 })
      
      );
      try {const newImages= await imagesAPI.fetchImagesWithQuery(imagesForSearch, currentPage);
        this.setState(prevState => ({
            images: [...prevState.images, ...newImages.data.hits],
          }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    };
  

  render(){
const{images, isLoading}=this.state;
    return(<>
    {(isLoading) &&
      (<Loader visible={true}/>)}
        <ul className={css.imageGallery}>
       {/* onClick={this.handleImageClick} */}
			{images.map(({ id, webformatURL, largeImageURL, tags }) => (
      <li  key={id} className={css.imageGalleryItem}>
        <ImageGalleryItem  webformatURL={webformatURL}
         largeImageURL={largeImageURL}
          tags={tags}
           onClick={()=>this.props.onSelect(largeImageURL, tags)}/></li>
            ))}
</ul>
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