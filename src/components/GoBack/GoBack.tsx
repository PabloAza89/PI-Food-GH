import css from "./GoBackCSS.module.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

interface GoBackI {
  recipeCreatedOrEdited?: boolean,
  recipeNotFound?: boolean
}

const GoBack = ({ recipeCreatedOrEdited, recipeNotFound }: GoBackI) =>  {

  return (
    <div className={css.logoTextContainer}>
      <Link to="/">
        <img className={css.logo} src={logo} alt=""></img>
      </Link>
      <Link className={css.noDeco} to="/">
        <div className={css.linkText}>Go Back !</div>
      </Link>
    </div>
  )
}

export default GoBack;