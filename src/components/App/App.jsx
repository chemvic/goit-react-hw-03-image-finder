import React,{Component} from 'react';
import Searchbar from "../Searchbar";
import ImageGallery from "../ImageGallery";
import css from "./App.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../Modal';
import Button from "../Button";
import Loader from '../Loader';
import imagesAPI from "../../api/fetchImages-api";

class App extends Component {

  state={
    images:[],
    imagesForSearch :'',
    currentPage: 1,
    showModal: false,
    imageForModal: null,
    tags:'',
    isLoading:false, 
    total: 0,
    error: null, 

  };

  async componentDidUpdate(_, prevState) { 
    
    if(prevState.imagesForSearch !== this.state.imagesForSearch||prevState.currentPage !== this.state.currentPage){
     this.fetchImages();
           
}
}

 
  formSubmitHandler=(imagesForSearch)=>{     
    this.setState({ imagesForSearch, images:[], currentPage:1 });
  }

  fetchImages=async()=>{
    const {currentPage, imagesForSearch}=this.state;
    this.setState({ isLoading: true });
    try {
      const newImages= await imagesAPI.fetchImagesWithQuery(imagesForSearch, currentPage);
      
      if (newImages.data.hits.length === 0) {
        return toast.error(
          "No images by your query"
        );
      }
      this.setState(({images}) => ({
          images: [...images, ...newImages.data.hits],
          total:  newImages.data.totalHits        
        }));
        
      
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  loadMoreImages =() => {   
    this.setState(
    (prevState) => ({ currentPage: prevState.currentPage + 1 })       
  );
 };



  onOpenModal=(largeImageURL, tags)=>{
this.setState({
  imageForModal:largeImageURL,
  showModal:true,
  tags:tags
  });
  }

  onCloseModal=()=>{
    this.setState({imageForModal:null, showModal:false, tags:''});
  }

render(){
  const { images, showModal, error, total, imageForModal, tags, isLoading }=this.state;
  const totalPage = total / images.length;
   return (
    <div className={css.App}>   
    
      <Searchbar onSubmit={this.formSubmitHandler}/>
      <ToastContainer autoClose={1000}/>

      {images.length>0 &&     <ImageGallery images={images} onOpenModal={this.onOpenModal}/>
}
      

      {(isLoading) && 
      (<Loader visible={true}/>)}
{(images.length>0 && !isLoading && totalPage > 1 )&&
<Button onClick={this.loadMoreImages}/>}
      {showModal && (
          <Modal image={imageForModal} tags={tags} onClose={this.onCloseModal} />
        )}
 {error && (
         <p>"Something went wrong((("</p>
        )}

    </div>
  );
}
};
export default App;
