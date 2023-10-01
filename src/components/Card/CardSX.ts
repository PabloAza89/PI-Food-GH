interface editDeleteContainerI {
  show: boolean
}

export const editDeleteContainer = ({ show }: editDeleteContainerI) => {
  return {
    display: show ? 'flex' : 'none'
  }
}