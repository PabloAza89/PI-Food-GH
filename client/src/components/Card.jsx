import React from "react";
import "../styles/Card.css";
import { Link } from "react-router-dom";
import noImage1 from "../images/noImage1.jpg";
import noImage2 from "../images/noImage2.jpg";
import noImage3 from "../images/noImage3.jpg";

export default function Card({ id, image, title, healthScore , diets, dishTypes }) {

    let arrImages = [noImage1, noImage2, noImage3]

    let randomNumber = Math.floor(Math.random() * 3) // BETWEEN 0 AND 2

    return (
        <div className="card">
            <Link to={`${id}`}>
                <img className="image" src={image ? image : arrImages[randomNumber] } alt=""></img>
             </Link>
            <Link to={`${id}`} className="title"> 
                <p className="card-text"><b className="title">{title}</b></p> 
            </Link>
            <div >
                {diets[0]&&<p className="card-text"><b>Diets: </b>{diets.map(function(e) {
                    if ((diets.indexOf(e) !== diets.length - 1)) {
                        return e.split(" ").map(e => e[0].toUpperCase() + e.slice(1)).join(" ") + " + "
                    } else return e.split(" ").map(e => e[0].toUpperCase() + e.slice(1)).join(" ")
                    })}
                </p>}
                <p className="card-text"><b>Healt Score: </b>{healthScore}</p>
                {dishTypes&&<p className="card-text"><b>Dish Types: </b>{dishTypes.map(function(e) {
                    if ((dishTypes.indexOf(e) !== dishTypes.length - 1)) {
                        return e.split(" ").map(e => e[0].toUpperCase() + e.slice(1)).join("  ") + " + "
                    } else return e.split(" ").map(e => e[0].toUpperCase() + e.slice(1)).join(" ")
                    })}</p>}
            </div>
        </div>
    );
   
}
