import "../../styles/About.css";
import * as s from "../../styles/AboutSX";
import { Link } from "react-router-dom";
import { Box, Button, TextField, Dialog, Typography,FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';

function About() {

    return (
      <Box sx={s.background}>
        <Typography sx={s.text}>Hi i'm Pablo ! And this is my Food App for my Individual Proyect at Henry ! &#x1F680;</Typography>
        <a href="https://www.linkedin.com/in/juan-pablo-azambuyo/" target="_blank" rel="noopener noreferrer">&#10145; MY LINKEDIN PROFILE &#11013;</a>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button sx={s.button} className="button">GO BACK !</Button>
        </Link>
      </Box>
    )
  }

export default About