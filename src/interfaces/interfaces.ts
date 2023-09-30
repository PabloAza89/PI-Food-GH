import { Dispatch, SetStateAction } from "react";

interface analyzedInstructionsI {
  0?: number
  name?: string,
  steps?: string[] | number[]
}

export interface recipesI {
  id: string | number,
  title: string,
  diets: string[],
  healthScore: number,
  summary: string,
  analyzedInstructions: analyzedInstructionsI[],
  image: string,
  dishTypes: string[],
  userRecipe: boolean,
  email: string
}

export interface serverStatusI {
  online: boolean,
  validKey: boolean,
  try: number,
}

interface userDataObjI {
  email: string,
  fd_tkn: string
}

export interface userDataI {
  userData: userDataObjI[]
}

export interface retrieveLoginI {
  retrieveLogin: any
}

// MyRecipe.tsx

interface titleI {
  character: boolean,
  badWord: boolean,
  empty: boolean
}

interface healthI {
  string?: boolean,
  max?: boolean,
  empty: boolean
}

interface summaryI {
  character: boolean,
  badWord: boolean,
  empty: boolean
}

interface instructionsI {
  character: boolean,
  badWord: boolean,
  empty: boolean
}

export interface errorI {
  title: titleI,
  health: healthI,
  summary: summaryI,
  instructions: instructionsI[]
}

export interface handlerAddInstructionsI {
  index: number,
}

export interface handlerUpdateInstructionsI {
  index: number,
  value: string
}

export interface validateStringI {
  type: string,
  value: string,
  index?: number,
}

export interface highlighterI {
  value: string,
  type: any,
  index?: number
}

export interface handlerDeleteInstructionsI {
  index: number
}