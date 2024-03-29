import css from "./AboutCSS.module.css";
import com from "../../commons/commonsCSS.module.css";
import { Link } from "react-router-dom";
import { Button } from '@mui/material/';

function About() {

    return (
      <div className={`${css.background} ${com.noSelect}`}>
        <div className={css.text}>
          {
            `Hi i'm Pablo ! And this is my Food App for my Individual Proyect at Henry ! `
          }&#x1F680;
        </div>
        <a
          className={css.link}
          href={`https://www.linkedin.com/in/juan-pablo-azambuyo`}
          target="_blank"
          rel="noopener noreferrer"
        >&#10145; {`MY LINKEDIN PROFILE`} &#11013;</a>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            className={css.button}
          >GO BACK !
          </Button>
        </Link>
      </div>
    )
  }

export default About