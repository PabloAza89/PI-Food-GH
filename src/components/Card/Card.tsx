import { Link } from "react-router-dom";
import { useState } from 'react';
import noImage1 from "../../images/noImage1.jpg";
import noImage2 from "../../images/noImage2.jpg";
import noImage3 from "../../images/noImage3.jpg";
import { Box, Typography, Divider } from '@mui/material';
import Tooltip from '@mui/joy/Tooltip';
import * as s from "../../styles/CardSX";
import $ from 'jquery';

interface CardI {
  id: string,
  image: string,
  title: string,
  healthScore: number,
  diets: any,
  dishTypes: any
}

const Card = ({ id, image, title, healthScore , diets, dishTypes }: CardI) => {

  let arrImages = [noImage1, noImage2, noImage3]

/*   function isEllipsisActive(e) {
    //return (e.offsetWidth < e.scrollWidth);
    console.log(e.offsetWidth < e.scrollWidth)
  } */

  //console.log(".dietsCard", $(`.dietsCard716426`).width())
  //console.log(".innerWidth", $(`.dietsCard716426`).innerWidth())
  //console.log(".innerWidth", $(`.dietsCard716426`).innerWidth())
  //console.log(".scrollWidth", $(`.dietsCard716426`).scrollWidth())
  //console.log(".offsetWidth", $(`.dietsCard716426`).offsetWidth())
  //console.log(".offset", $(`.dietsCard716426`).offset())
  //console.log(".dietsCard", $(`.dietsCard716426`).width())

  //console.log(".innerWidth", $(`.dietsCard716426`).innerWidth())
  //console.log(".scrollWidth", $(`.dietsCard716426`).prop(`scrollWidth`))

  //console.log(".innerWidth", $(`.dietsCard716408`).innerWidth())
  //console.log(".scrollWidth", $(`.dietsCard716408`).prop(`scrollWidth`))


  //console.log(".outerWidth()", $(`.dietsCard716426`).outerWidth())


  //console.log(".innerWidthASD", $(`.dietsCard716426`))

    // arraySplitedBy9.map(e => e.media).flat().forEach(r => {
  //   $(`.extraPXImage${arraySplitedBy9.map(e => e.media).flat().indexOf(r)}`) // when hover image, extra pixels helper on right
  //   .on( "mouseenter", function(){
  //     $(`.extraPXSolid`)


  //   })
  //   .on( "mouseleave", function(){
  //     $(`.extraPXSolid`)


  //   })
  // })

  const [ fitTitle, setFitTitle ] = useState<boolean>(true)
  const [ fitDiet, setFitDiet ] = useState<boolean>(true)
  const [ fitDish, setFitDish ] = useState<boolean>(true)

  //console.log("fit", fit, "id", id)

  // $(`.dietsCard${id}`)
  // .on( "mouseenter", function(){
  //   $(`.dietsCard${id}`)


  // })
  // .on( "mouseleave", function(){
  //   $(`.dietsCard${id}`)


  // })

  // $(`.dietsCard${id}`)
  // .on(function(){
  //   $(`.dietsCard${id}`).prop(`scrollWidth`) > $(`.dietsCard${id}`).innerWidth()! ? setFit(false) : setFit(true)
  // })


  $(function(){
    $(`.dietCard${id}`).prop(`scrollWidth`) > $(`.dietCard${id}`).innerWidth()! ? setFitDiet(false) : setFitDiet(true)
    $(`.titleCard${id}`).prop(`scrollWidth`) > $(`.titleCard${id}`).innerWidth()! ? setFitTitle(false) : setFitTitle(true)
    $(`.dishCard${id}`).prop(`scrollWidth`) > $(`.dishCard${id}`).innerWidth()! ? setFitDish(false) : setFitDish(true)
  })

  //console.log("fit", fitDiet, "id", id)
  //console.log("fit", fit)

  return (
    <Box sx={s.background}>
      <Link to={`/${id}`}>
        {/* <Box component="img" sx={s.image} src={image.length > 1 ? image : arrImages[image] } alt="" /> */}
        <Box component="img" sx={s.image} src={image} alt="" />
      </Link>
      <Link style={{ textDecoration: 'none' }} to={`/${id}`}>
        <Tooltip
          arrow
          enterDelay={700}
          enterNextDelay={700}
          leaveDelay={200}
          enterTouchDelay={0}
          disableFocusListener={fitTitle}
          disableHoverListener={fitTitle}
          placement="bottom"
          title={title}
        >
          <Typography className={`titleCard${id}`} sx={s.title}>{title}</Typography>
        </Tooltip>
      </Link>
      <Tooltip
        arrow
        enterDelay={700}
        enterNextDelay={700}
        leaveDelay={200}
        enterTouchDelay={0}
        disableFocusListener={fitDiet}
        disableHoverListener={fitDiet}
        placement="bottom"
        title={
          <Box>
            <b>Diets: </b>
            {diets[0] && diets.map((e:any) => {
              if ((diets.indexOf(e) !== diets.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ") + " + "
              else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
            })}
          </Box>
        }
      >
        <Typography
          className={`dietCard${id}`}
          sx={s.text}
        >
          <b>Diets: </b>
          {diets[0] && diets.map((e:any) => {
            if ((diets.indexOf(e) !== diets.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ") + " + "
            else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
          })}
        </Typography>
      </Tooltip>
      <Typography sx={s.text}>
        <b>Healt Score: </b>{healthScore}
      </Typography>
      <Tooltip
          arrow
          enterDelay={700}
          enterNextDelay={700}
          leaveDelay={200}
          enterTouchDelay={0}
          disableFocusListener={fitDish}
          disableHoverListener={fitDish}
          placement="bottom"
          title={
            <Box>
              <b>Dish Types: </b>
              {dishTypes && dishTypes.map((e:any) => {
                if ((dishTypes.indexOf(e) !== dishTypes.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join("  ") + " + "
                else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
              })}
            </Box>
          }
      >
        <Typography
          className={`dishCard${id}`}
          sx={s.text}
        >
          <b>Dish Types: </b>
          {dishTypes && dishTypes.map((e:any) => {
            if ((dishTypes.indexOf(e) !== dishTypes.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join("  ") + " + "
            else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
          })}
        </Typography>
      </Tooltip>
    </Box>
  );
}

export default Card;