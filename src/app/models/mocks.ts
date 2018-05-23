import { Character } from "../models/character";

export const SPECIES_TAB: string[] = ["a","b"];
export const CHARACTER_OBJECT: Character = {
  id: 1,
  name: 'a',
  species: 'b',
  gender: 1,
  homeworld: 'c'}
const CHARACTER_OBJECT_1: Character = {
  id: 1,
  name: 'b',
  species: 'c',
  gender: 2,
  homeworld: 'd'
}
export const CHARACTER_TAB: Character[] = [CHARACTER_OBJECT,
                                          CHARACTER_OBJECT,
                                          CHARACTER_OBJECT,
                                          CHARACTER_OBJECT,
                                          CHARACTER_OBJECT,
                                          CHARACTER_OBJECT_1,
                                          CHARACTER_OBJECT_1,
                                          CHARACTER_OBJECT_1,
                                          CHARACTER_OBJECT_1,
                                          CHARACTER_OBJECT_1,
                                          CHARACTER_OBJECT_1];
