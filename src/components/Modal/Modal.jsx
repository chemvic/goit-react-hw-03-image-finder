
import React,{Component} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from "./Modal.module.css";
const modalRoot = document.querySelector('#modal-root');


class Modal extends Component{

  componentDidMount() { 
    window.addEventListener('keydown', this.handleEscCatch)
   }

   componentWillUnmount() {
    window.removeEventListener('keydown',this.handleEscCatch)
    }

    handleEscCatch=(event)=>{
      
      if(event.code==='Escape'){
this.props.onClose();
      }
    }
    handleOverlayClick=(event)=>{
      if(event.currentTarget===event.target){
        this.props.onClose();
      }
    }
  
  render(){

const{image, tags}=this.props;
return createPortal(
  <div className={css.overlay} onClick={this.handleOverlayClick}>
  <div className={css.modal}>
  <img src={image} alt={tags} className={css.imageModal} />
  </div>
</div>, modalRoot
    );

  }
}

Modal.propTypes={
 
  tags: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Modal;      