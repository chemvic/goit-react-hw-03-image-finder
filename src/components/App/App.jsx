import React,{Component} from 'react';
import Searchbar from "../Searchbar";
import ImageGallery from "../ImageGallery";
import css from "./App.module.css";
// import Button from "../Button";

import { ToastContainer } from 'react-toastify';
import Modal from '../Modal';

class App extends Component {

  state={
    images:[],
    imagesForSearch:'',
    showModal: false,
    imageForModal: null,
    tags:'',
   

  };

  formSubmitHandler=(imagesForSearch)=>{     
    this.setState({imagesForSearch});
  }

  handlerLargeImage=(largeImageURL, tags)=>{
this.setState({
  imageForModal:largeImageURL,
  tags: tags,
   showModal:true
  });
  }

  onCloseModal=()=>{
    this.setState({imageForModal:null, showModal:false});
  }

render(){
  const { imagesForSearch, showModal, imageForModal, tags }=this.state;
   return (
    <div className={css.App}>
   
    
      <Searchbar onSubmit={this.formSubmitHandler}/>
      <ToastContainer autoClose={2000}/>
      <ImageGallery imagesForSearch={imagesForSearch} onSelect={this.handlerLargeImage}/>
      {showModal && (
          <Modal image={imageForModal} tags={tags} onClose={this.onCloseModal} />
        )}
    </div>
  );
}
};
export default App;