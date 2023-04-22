import React from 'react';
import PropTypes from 'prop-types';
import css from "./Loader.module.css";
import { ThreeDots  } from  'react-loader-spinner'


const Loader=({visible})=>{
   
    return(
       <div className={css.loader}> <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#4fa94d" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={visible}
         />
    </div>)
       
}
Loader.propTypes={
    visible: PropTypes.bool.isRequired
}
export default Loader;