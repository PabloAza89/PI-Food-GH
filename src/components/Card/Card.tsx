import { useState, useEffect, Dispatch, SetStateAction } from "react";
import css from "./CardCSS.module.css";
import com from "../../commons/commonsCSS.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import noImage1 from "../../images/noImage1.jpg";
import noImage2 from "../../images/noImage2.jpg";
import noImage3 from "../../images/noImage3.jpg";
import notAvailable from "../../images/notAvailable.jpg";
import { Button } from '@mui/material';
import Tooltip from '@mui/joy/Tooltip';
import { handleDelete, handleEdit } from '../../commons/commonsFunc';
import $ from 'jquery';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import {
  getRecipesFromDB, getDietsFromDB, getDishesFromDB,
  applyFilters
} from '../../actions';
import {
  recipesI, userDataI, settingsFiltersI, paginateAmountI
} from '../../interfaces/interfaces';

interface CardI {
  setUserData: Dispatch<SetStateAction<userDataI>>
  userData: userDataI
}

interface CardI extends recipesI, paginateAmountI {}

const Card = ({
  id, image, title, healthScore , diets, email,
  dishTypes, userRecipe, setUserData, userData,
  summary, analyzedInstructions, paginateAmount
}: CardI) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reloadRecipes = async () => {
    Promise.all([
      dispatch(getDietsFromDB()),
      dispatch(getDishesFromDB()),
      dispatch(getRecipesFromDB())
    ]).then(() => dispatch(applyFilters()))
  }

  const handleReload = (props: any) => {
    if (props.statusResponse === 200 && props.messageResponse === `1 item deleted`) reloadRecipes()
  }

  let arrImages = [noImage1, noImage2, noImage3]

  const settingsFilters = useSelector((state: { settingsFilters: settingsFiltersI }) => state.settingsFilters)
  const [ fitTitle, setFitTitle ] = useState<boolean>(true)
  const [ fitDiet, setFitDiet ] = useState<boolean>(true)
  const [ fitDish, setFitDish ] = useState<boolean>(true)
  const [ brokenImage, setBrokenImage ] = useState<boolean>(false)

  $(function(){
    $(`.dietCard${id}`).prop(`scrollWidth`) > $(`.dietCard${id}`).innerWidth()! ? setFitDiet(false) : setFitDiet(true)
    $(`.titleCard${id}`).prop(`scrollWidth`) > $(`.titleCard${id}`).innerWidth()! ? setFitTitle(false) : setFitTitle(true)
    $(`.dishCard${id}`).prop(`scrollWidth`) > $(`.dishCard${id}`).innerWidth()! ? setFitDish(false) : setFitDish(true)
  })

  useEffect(() => {
    if (userRecipe && image.length > 1) {
      fetch( `https://res.cloudinary.com/dtembdocm/image/upload/` + image, {
        headers: { 'Cache-Control': 'no-cache' }
      })
      .then((res) => {
        if (res.ok) setBrokenImage(false)
        else setBrokenImage(true)
      })
      .catch((err) => { console.error(err) })
    }
    // eslint-disable-next-line
  },[])

  return (
    <div
      className={css.backgroundCard}
    >
      <div
        className={css.editDeleteContainer}
        style={{
          overflow: 'hidden',
          display: userRecipe && userData.email === email ? 'flex' : 'none',
        }}
      >
        <Button
          variant="contained"
          id={css.buttonEditDelete}
          className={css.onlyEdit}
          onClick={() => handleEdit({
            navigate, id, title, image, healthScore,
            diets, email, dishTypes, userRecipe,
            summary, analyzedInstructions
          })}
        >
          <EditIcon className={css.iconEdit} />
        </Button>
        <Button
          variant="contained"
          id={css.buttonEditDelete}
          onClick={() => handleDelete({ id: id, fd_tkn: userData.fd_tkn, setUserData, handleReload })}
        >
          <ClearIcon className={css.iconDelete} />
        </Button>
      </div>
      <div className={`${css.imageOrTitleContainer} ${com.noSelect}`}>
        <Link className={css.linkStyle} to={`/${id}`} state={{ webFlow: true }}>
          <img
            className={css.image}
            src={
              brokenImage ?
              notAvailable :
              userRecipe && image.length === 1 ?
              arrImages[parseInt(image, 10) - 1] :
              userRecipe && image.length > 1 ?
              `https://res.cloudinary.com/dtembdocm/image/upload/` + image :
              image
            }
            alt=""
            loading="lazy"
          />
        </Link>
      </div>
      <div className={`${css.imageOrTitleContainer} ${com.noSelect}`}>
        <Tooltip
          // MOBILE
          enterTouchDelay={500}
          leaveTouchDelay={2000}
          // DESKTOP
          enterDelay={1000}
          enterNextDelay={1000}
          leaveDelay={500}
          disableFocusListener={
            paginateAmount === 45 ?
            true :
            !settingsFilters.showTooltips || fitTitle
          }
          disableHoverListener={
            paginateAmount === 45 ?
            true :
            !settingsFilters.showTooltips || fitTitle
          }
          arrow
          placement="bottom"
          hidden={ settingsFilters.showTooltips ? false : true }
          title={
            <div className={css.innerTooltip}>
              {title}
            </div>
          }
        >
          <div
            className={`titleCard${id}`}
            id={css.title}
          >
            <Link
              onContextMenu={(e) => { // DISABLE CONTEXT MENU --> THEN MAKES TOOLTIP NOT FAIL ON MOBILE
                e.preventDefault();
                e.stopPropagation();
                return false;
              }}
              className={css.linkStyle}
              to={`/${id}`}
              state={{ webFlow: true }}
            >
              {title}
            </Link>
          </div>
        </Tooltip>
      </div>
        <Tooltip
          // MOBILE
          enterTouchDelay={500}
          leaveTouchDelay={2000}
          // DESKTOP
          enterDelay={1000}
          enterNextDelay={1000}
          leaveDelay={500}
          disableFocusListener={
            paginateAmount === 45 ?
            true :
            !settingsFilters.showTooltips || fitDiet
          }
          disableHoverListener={
            paginateAmount === 45 ?
            true :
            !settingsFilters.showTooltips || fitDiet
          }
          arrow
          placement="bottom"
          hidden={ settingsFilters.showTooltips ? false : true }
          title={
            <div className={css.innerTooltip}>
              <b>Diets: </b>
              {diets[0] && diets.map((e:any) => {
                if ((diets.indexOf(e) !== diets.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ") + " + "
                else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
              })}
            </div>
          }
        >
          <div
            className={`dietCard${id} ${com.noSelect}`}
            id={css.text}
          >
            <b>Diets: </b>
            {
              diets[0] !== undefined ?
              diets.map((e:any) => {
                if ((diets.indexOf(e) !== diets.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ") + " + "
                else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
              }) :
              `Not specified`
            }
          </div>
        </Tooltip>
      <div className={com.noSelect} id={css.text}>
        <b>Healt Score: </b>{healthScore}
      </div>
      <Tooltip
        // MOBILE
        enterTouchDelay={500}
        leaveTouchDelay={2000}
        // DESKTOP
        enterDelay={1000}
        enterNextDelay={1000}
        leaveDelay={500}
        disableFocusListener={
          paginateAmount === 45 ?
          true :
          !settingsFilters.showTooltips || fitDish
        }
        disableHoverListener={
          paginateAmount === 45 ?
          true :
          !settingsFilters.showTooltips || fitDish
        }
        arrow
        placement="bottom"
        hidden={ settingsFilters.showTooltips ? false : true }
        title={
          <div className={css.innerTooltip}>
            <b>Dish Types: </b>
            {dishTypes && dishTypes.map((e:any) => {
              if ((dishTypes.indexOf(e) !== dishTypes.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join("  ") + " + "
              else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
            })}
          </div>
        }
      >
        <div
          className={`dishCard${id} ${com.noSelect}`}
          id={css.text}
        >
          <b>Dish Types: </b>
          {
            dishTypes[0] !== undefined ?
            dishTypes.map((e:any) => {
              if ((dishTypes.indexOf(e) !== dishTypes.length - 1)) return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join("  ") + " + "
              else return e.split(" ").map((e:any) => e[0].toUpperCase() + e.slice(1)).join(" ")
            }) :
            `Not specified`
          }
        </div>
      </Tooltip>
    </div>
  );
}

export default Card;