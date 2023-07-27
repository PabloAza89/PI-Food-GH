import "../../styles/Card.css";
import { Link } from "react-router-dom";
import noImage1 from "../../images/noImage1.jpg";
import noImage2 from "../../images/noImage2.jpg";
import noImage3 from "../../images/noImage3.jpg";
import { Box } from '@mui/material';

interface CardI {
  id: any, image: any, title: any, healthScore: any , diets: any, dishTypes: any
}

function Card({ id, image, title, healthScore , diets, dishTypes }: CardI) {

    let arrImages = [noImage1, noImage2, noImage3]

    return (
        <Box className="card">
            <Link to={`/PI-Food-GH/${id}`}>
                <img className="image" src={image.length > 1 ? image : arrImages[image] } alt=""></img>
             </Link>
            <Link to={`/PI-Food-GH/${id}`} className="title">
                <p className="card-text"><b className="title">{title}</b></p>
            </Link>
            <Box >
                {diets[0]&&<p className="card-text"><b>Diets: </b>{diets.map(function(e:any) {
                    if ((diets.indexOf(e) !== diets.length - 1)) {
                        return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ") + " + "
                    } else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
                    })}
                </p>}
                <p className="card-text"><b>Healt Score: </b>{healthScore}</p>
                {dishTypes&&<p className="card-text"><b>Dish Types: </b>{dishTypes.map(function(e:any) {
                    if ((dishTypes.indexOf(e) !== dishTypes.length - 1)) {
                        return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join("  ") + " + "
                    } else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
                    })}</p>}
            </Box>
        </Box>
    );

}

export default Card;