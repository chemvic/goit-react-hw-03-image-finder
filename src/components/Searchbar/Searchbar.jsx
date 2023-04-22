import React, {Component} from 'react';
import PropTypes from 'prop-types';
import css from "./Searchbar.module.css";
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state={
    imagesForSearch:'',
  }

  handleSubmit=(event)=>{
    const{imagesForSearch}=this.state;
    if(imagesForSearch.trim()===''){
      toast.error('Enter images for search');  
         return;
    }

    event.preventDefault();
    this.props.onSubmit(imagesForSearch);
   
  }

  handleImagesNames =(event)=>{
    this.setState({imagesForSearch: event.currentTarget.value.toLowerCase()});
    
  }

  render(){
     return(
        <header className={css.searchbar}>
  <form className={css.searchForm} onSubmit={this.handleSubmit}>
    <button type="submit" className={css.searchFormButton}>
      <span className={css.searchFormButtonLabel}>Search</span>
    </button>

    <input
      className={css.searchFormInput}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={this.handleImagesNames}
    />
  </form>
</header>
    )
  }
   
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

export default Searchbar;