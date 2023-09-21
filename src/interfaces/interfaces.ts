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