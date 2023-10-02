import css from "./AboutCSS.module.css";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from '@mui/material/';

function About() {

    return (
      <div className={css.background}>
        <div className={css.text}>
          {
            `Hi i'm Pablo ! And this is my Food App for my Individual Proyect at Henry ! `
          }&#x1F680;
        </div>
        <a
          className={css.link}
          href={`https://www.linkedin.com/in/juan-pablo-azambuyo`}
          target="_blank"
          rel="noopener noreferrer"
        >&#10145; {`MI PERFIL DE LINKEDIN`} &#11013;</a>
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