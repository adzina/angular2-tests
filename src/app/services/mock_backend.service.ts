import { Character } from "../models/character";
import { Observable } from 'rxjs/Rx';
import {CHARACTER_OBJECT, CHARACTER_TAB, SPECIES_TAB} from '../models/mocks';


export class MockBackend{
  getAllCharacters(): Observable<Character[]>{
  return Observable.of(CHARACTER_TAB)
  }
  fullTextSearch(query:string): Observable<Character[]>{
    return Observable.of(CHARACTER_TAB)
  }
  getAllSpecies(): Observable<string[]>{
    return Observable.of(SPECIES_TAB)
  }
  addNewCharacter(char:Character): Observable<any>{
    return Observable.of(CHARACTER_OBJECT)
  }
  deleteCharacter(id:number): Observable<any>{
    return Observable.of(CHARACTER_OBJECT)
  }
  updateCharacter(char:Character): Observable<any>{
    return Observable.of(CHARACTER_OBJECT)
  }
}
