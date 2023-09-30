import '../../styles/DisableAutoFocusSweetAlert2.css';
import Swal from 'sweetalert2';
import { recipesI } from '../../interfaces/interfaces';

// USED IN CARD & DETAIL

interface handleDeleteI {
  id: string | number,
  fd_tkn: string,
  retrieveLogin: any
  handleReload: any
}

export const handleDelete = async ({ id, fd_tkn, retrieveLogin, handleReload }: handleDeleteI ) => {

  Swal.fire({
    title: 'Are you sure do you want to delete this recipe ?',
    text: 'No undo.',
    icon: 'info',
    showDenyButton: true,
    confirmButtonText: 'DELETE',
    denyButtonText: `CANCEL`,
    confirmButtonColor: '#d14141', // NEW ACTION COLOR
    denyButtonColor: '#3085d6', // NO ACTION COLOR
  })
  .then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:3001/delete`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          id: id,
          fd_tkn: fd_tkn
        })
      })
      .then((res) => res.json())
      .then((res) => {
        console.log("RES RES", res)
        if (res.status === 400 && res.message === 'Invalid Credentials') {
          console.log("PASS BY THIS WAY")
          retrieveLogin({ email: '', fd_tkn: '' })
          Swal.fire({
            title: `There was an error when cheking your loggin.. `,
            text: `Please, log in again.`,
            icon: 'info',
            showConfirmButton: false,
            showDenyButton: false,
            showCancelButton: false,
            timer: 3000,
          })
        }
        if (res.status === 400 && res.message === `0 item deleted`) {
          Swal.fire({
            title: `There was and error..`,
            html: `Please, try again.`,
            icon: 'info',
            showConfirmButton: false,
            showDenyButton: false,
            showCancelButton: false,
            timer: 3000,
          })
        }
        if (res.status === 200 && res.message === `1 item deleted`) {
          Swal.fire({
            title: `Recipe deleted successfully..`,
            icon: 'success',
            showConfirmButton: false,
            showDenyButton: false,
            showCancelButton: false,
            timer: 3000,
          })
          handleReload({ statusResponse: 200, messageResponse: `1 item deleted` })
        }
      })
    }
  })
  .catch((rej) => {
    console.log("rej", rej)
    Swal.fire({
      title: `It's seems like server its sleeping..`,
      html: `So you cannot save your recipe.<br>We are sorry. Please try againg later..<br><br>Don't worry about everything you wrote, it will be saved in browser memory :) `,
      icon: 'error',
      showConfirmButton: false,
      showDenyButton: false,
      showCancelButton: false,
      timer: 3000,
    })
  })
}

// USED IN CARD & DETAIL

interface handleEditI { navigate: any }
interface handleEditRecipesI extends handleEditI, recipesI {}

export const handleEdit = async ({
    navigate, id, title, image, healthScore, diets, email,
    dishTypes, userRecipe, summary, analyzedInstructions
  }: handleEditRecipesI) => {

  Swal.fire({
    title: 'Do you want to edit this recipe ?',
    icon: 'question',
    showDenyButton: true,
    confirmButtonText: 'EDIT',
    denyButtonText: `CANCEL`,
    confirmButtonColor: '#d14141', // NEW ACTION COLOR
    denyButtonColor: '#3085d6', // NO ACTION COLOR
  })
  .then((result) => {
    if (result.isConfirmed) {
      navigate("/MyRecipe", {
        state: {
          editing: true, id, title, image,
          healthScore, diets, email, dishTypes,
          userRecipe, summary, analyzedInstructions
        }
      });
    }
  })
  .catch((rej) => {
    console.log("rej", rej)
    Swal.fire({
      title: `It's seems like server its sleeping..`,
      html: `So you cannot save your recipe.<br>We are sorry. Please try againg later..<br><br>Don't worry about everything you wrote, it will be saved in browser memory :) `,
      icon: 'error',
      showConfirmButton: false,
      showDenyButton: false,
      showCancelButton: false,
      timer: 3000,
    })
  })
}
