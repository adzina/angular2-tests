import {Gender} from '../enums/gender.enum'
export interface Character {
  id: number,
  name: string,
  species: string,
  gender: Gender,
  homeworld: string
}
