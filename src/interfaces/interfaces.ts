export interface recipesI {
  id: any,
  title: any,
  diets: any,
  healthScore: any,
  summary: any,
  analyzedInstructions: any,
  image: any,
  dishTypes: any,
  userRecipe: boolean,
}

export interface serverStatusI {
  online: boolean,
  validKey: boolean,
  try: number,
}