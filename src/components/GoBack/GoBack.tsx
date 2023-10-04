import { useState } from "react";
import css from "./GoBackCSS.module.css";
import com from '../../commons/commonsCSS.module.css';
//import * as s from './GoBackSX';
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import Swal from 'sweetalert2';

interface GoBackI {
  recipeCreatedOrEdited?: boolean,
  recipeNotFound?: boolean
}

const GoBack = ({ recipeCreatedOrEdited, recipeNotFound }: GoBackI) =>  {

  const location = useLocation()
  const navigate = useNavigate()
  
  const [isEditing, setIsEditing] = useState<boolean>( location.state && location.state.editing ? true : false );

  const handleReturn = () => {
    if (location.pathname.toLowerCase() === `/myrecipe` && isEditing && !recipeCreatedOrEdited) {
      Swal.fire({
        title: 'Do you want to cancel editing and go back ?',
        text: 'Any changes you have made gonna be lost.',
        icon: 'info',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'CANCEL EDITING',
        denyButtonText: `CONTINUE EDITING`,
        confirmButtonColor: '#d14141', // NEW ACTION COLOR
        denyButtonColor: '#3085d6' // NO ACTION COLOR
      })
      .then((result) => {
        if (result.isConfirmed) navigate("/")
      })
    } 
    else if (location.pathname.toLowerCase() === `/myrecipe` && !isEditing && !recipeCreatedOrEdited) {
      Swal.fire({
        title: 'Do you want to cancel create a new recipe and go back ?',
        text: `Don't worry about everything you wrote, it will be saved in browser memory :)`,
        icon: 'info',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'CANCEL CREATING',
        denyButtonText: `CONTINUE CREATING`,
        confirmButtonColor: '#d14141', // NEW ACTION COLOR
        denyButtonColor: '#3085d6' // NO ACTION COLOR
      })
      .then((result) => {
        if (result.isConfirmed) navigate("/")
      })
    }
    else navigate("/")
  }

  return (
    <div onClick={() => handleReturn()} className={css.background} style={{ display: recipeNotFound ? 'none' : 'flex' }} >
      <img className={css.logo} src={logo} alt=""/>
    {
      location.pathname.toLowerCase() === `/myrecipe`  ?
      <div className={`${css.columnContainer} ${com.noDeco}`}>
        <div className={css.letters}>
          <div>G</div><div>o</div><div style={{ marginTop: '13px' }} /><div>B</div><div>a</div><div>c</div><div style={{ marginTop: '2px' }}>k</div>
        </div>
        <div className={css.exclamationMarkContainer}>
          <div className={css.exclamationMark}>!</div>
        </div>
      </div> :
      `G<br/>o<br/><br/>B<br/>a<br/>c<br/>k<br/>!`
    }
    </div>
  );
}

export default GoBack;