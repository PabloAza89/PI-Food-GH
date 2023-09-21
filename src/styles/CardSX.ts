import {
  flex, relative, absolute, fixed, column, pointer,
  row, aic, aifs, asc, jcc, jcfe, jcfs, jcsa,
  jcsb, jcse, jsc, jic, noDeco, mix, noSelect
} from './CommonsSX';

export const background = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '450px',
    height: '225px',
    margin: '9px 9px 9px 9px',
    justifyContent: 'center',
    //backgroundColor: 'rgba(196, 34, 147, 0.253)', // dev
    background: 'linear-gradient(135deg, rgba(196, 34, 147, 0.1), rgba(196, 34, 147, 0))',
    //WebkitBackdropFilter: 'blur(20px)',
    backdropFilter: 'blur(20px)',
    //filter: 'blur(3px)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    border: '1px solid rgb(255, 255, 255, 0.18)',
    borderRadius: '4px',
  }
}

interface editDeleteContainerI {
  show: boolean
}

export const editDeleteContainer = ({ show }: editDeleteContainerI) => {
  return {
    display: show ? 'flex' : 'none',
    position: 'absolute',
    flexDirection: 'row',
    right: '5px',
    top: '5px',
  }
}

export const buttonEditDelete = () => {
  return {
    display: 'flex',
    position: 'relative',
    padding: '0vw !important',
    minWidth: '30px !important',
    width: '30px !important',
    minHeight: '30px !important',
    height: '30px !important',
    marginLeft: '5px'
  }
}

export const iconEdit = () => {
  return {
    padding: '0vw !important',
    width: '21px !important',
    height: '21px !important',
  }
}

export const iconDelete = () => {
  return {
    padding: '0vw !important',
    width: '23px !important',
    height: '23px !important',
  }
}

export const image = () => {
  return {
    ...noSelect,
    display: 'flex',
    width: '280px',
    height: '115px',
  }
}

export const title = () => {
  return {
    ...noSelect,
    fontSize: '19px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    textDecoration: 'none',
    whiteSpace: 'nowrap', // all 3 together
    overflow: 'hidden', // all 3 together
    textOverflow: 'ellipsis', // all 3 together
    color: 'antiquewhite',
    fontWeight: 700,
    //background: 'red', // dev
    width: '417px',
    height: '25px',
    textAlign: 'center',
    letterSpacing: 'normal',
  }
}

export const text = () => {
  return {
    ...noSelect,
    fontSize: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    textDecoration: 'none',
    whiteSpace: 'nowrap', // all 3 together
    overflow: 'hidden', // all 3 together
    textOverflow: 'ellipsis', // all 3 together
    color: 'antiquewhite',
    //fontWeight: 700,
    //background: 'red', // dev
    width: '417px',
    height: '25px',
    textAlign: 'center',
    letterSpacing: 'normal',
  }
}

