import React from 'react';
import PropTypes from 'prop-types';
import css from "./Button.module.css";

const Button=({onClick})=>{
    return(
        <div className={css.buttonWrapper}>
        <button onClick={onClick} type="button" className={css.button}>Load more</button>
        </div>
    )

}
Button.propTypes = {
    onClick: PropTypes.func.isRequired
  }
export default Button;