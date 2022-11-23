import React from "react";
import { useParams } from "react-router-dom";
import "../styles/Detail.css";
import noImage1 from "../images/noImage1.jpg";
import noImage2 from "../images/noImage2.jpg";
import noImage3 from "../images/noImage3.jpg";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

export default function Detail({onFilterID}) {

    let arrImages = [noImage1, noImage2, noImage3]
    
    let randomNumber = Math.floor(Math.random() * 3) // BETWEEN 0 AND 2

    var params = useParams()
    
    var food = onFilterID(params.foodId)

    function regexInSummary(text) {
        return text.replaceAll(/(<[/]b>|<b>|<[/]a>|<a\b[^>]*>|[/]a>)/g, '');
    }
      
    if (food) {
        return (
            <div className="detail-body">
                <div className="main-upper">
                    <div className="main-upper-left">
                        <Link id="iconImageDiv" to="/">
                            <img className="iconImageForm" src={logo} alt=""></img>
                        </Link>
                        <Link id="iconText" to="/">
                            <h2>Go Back !</h2> 
                        </Link>
                    </div>
                    <div className="main-upper-right">
                        <img className="image-detail" src={food.image ? food.image : arrImages[randomNumber]} alt=""></img>
                    </div>
                </div>
                <div className="main-lower">
                    <span className="text-smaller-stylee">
                        <span className="text-smaller-style"><b>Title: </b>{food.title}</span>
                        <span className="text-smaller-style"><b>{food.diets[0]&&"Diets: "}</b>{food.diets.map(function(e) {
                            if ((food.diets.indexOf(e) !== food.diets.length - 1)) {
                                return e + " + "
                            } else return e
                            })}</span>
                        <span className="text-smaller-style"><b>Health Score: </b>{food.healthScore}</span>                    
                        {food.dishTypes && <span className="text-smaller-style"><b>Dish Types: </b>{food.dishTypes.map(function(e) {
                        if ((food.dishTypes.indexOf(e) !== food.dishTypes.length - 1)) {
                            return e.split(" ").map(e => e[0].toUpperCase() + e.slice(1)).join("  ") + " + "
                        } else return e.split(" ").map(e => e[0].toUpperCase() + e.slice(1)).join(" ")
                        })}</span>}    
                        
                        <span className="text-smaller-style" id="backgroundColor"><b>Summary: </b>{regexInSummary(food.summary)} </span>
                        {food.analyzedInstructions[0] ? <span className="text-smaller-style" id="backgroundColor"><b>Instructions: </b>{food.analyzedInstructions}</span> : <div></div>}
                    </span>    
                </div>   
            </div>
        )
    } else if (params.foodId === "create" || params.foodId === "about") {
        return (<div></div>)
    } else {
        return (
                <div className="alertButtonBG">
                    <span>THERE ARE NO MATCHING RECIPES WITH THAT ID !</span>
                    <Link id="alertTextLink" to="/" >
                        <button className='alertButton'><b className='innerText' >GO BACK !</b></button>
                    </Link>
                </div>
             )
    }    
}