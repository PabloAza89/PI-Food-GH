import "../../styles/About.css";
import { Link } from "react-router-dom";
import { Box, Button, TextField, Dialog, Typography,FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material/';

function About() {

    return (
      <Box className="about">
        <Typography>Hi i'm Pablo ! And this is my Food App for my Individual Proyect at Henry ! &#x1F680;</Typography>
        <a href="https://www.linkedin.com/in/juan-pablo-azambuyo/" target="_blank" rel="noopener noreferrer">&#10145; MY LINKEDIN PROFILE &#11013;</a>
        <Link id="alertTextLink" to="/" >
          <Button className='alertButton'><b className='innerText' >GO BACK !</b></Button>
        </Link>
      </Box>
    )
  }

export default About