import { Link } from "react-router-dom";
import noImage1 from "../../images/noImage1.jpg";
import noImage2 from "../../images/noImage2.jpg";
import noImage3 from "../../images/noImage3.jpg";
import { Box, Typography } from '@mui/material';
import * as s from "../../styles/CardSX";

interface CardI {
  id: any,
  image: any,
  title: any,
  healthScore: any,
  diets: any,
  dishTypes: any
}

function Card({ id, image, title, healthScore , diets, dishTypes }: CardI) {

  let arrImages = [noImage1, noImage2, noImage3]

  return (
    <Box sx={s.background}>
      <Link to={`/${id}`}>
        <Box component="img" sx={s.image} src={image.length > 1 ? image : arrImages[image] } alt="" />
      </Link>
      <Link style={{ textDecoration: 'none' }} to={`/${id}`}>
        <Typography sx={s.title}>{title}</Typography>
      </Link>
      <Typography sx={s.text}>
        <b>Diets: </b>
        {diets[0] && diets.map((e:any) => {
          if ((diets.indexOf(e) !== diets.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ") + " + "
          else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
        })}
      </Typography>
      <Typography sx={s.text}>
        <b>Healt Score: </b>{healthScore}
      </Typography>
      <Typography sx={s.text}>
        <b>Dish Types: </b>
        {dishTypes && dishTypes.map((e:any) => {
          if ((dishTypes.indexOf(e) !== dishTypes.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join("  ") + " + "
          else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
        })}
      </Typography>
    </Box>
  );
}

export default Card;