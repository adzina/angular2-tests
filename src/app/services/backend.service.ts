import { Injectable } from '@angular/core';
import { Observable,Observer } from 'rxjs/Rx';
import { Http, Response} from '@angular/http';
import { Character } from '../models/character';


@Injectable()
export class BackendService{
  g_url = 'http://localhost:3000/'

  constructor(private http:Http){}

  getAllCharacters(): Observable<Character[]>{
    let url = this.g_url+"characters";
    return this.http.get(url)
    .map((res:Response)=> res.json())
    .catch((error:any) =>
        Observable.throw("An error occured when fetching all characters"));

  }
  fullTextSearch(query:string): Observable<Character[]>{
    let url = this.g_url+"characters?q="+query;
    return this.http.get(url)
    .map((res:Response) => res.json())
    .catch((error:any) =>
        Observable.throw("An error occured when fetching queried characters"));
  }
  getAllSpecies(): Observable<string[]>{
    let url = this.g_url+"species";
    return this.http.get(url)
    .map((res:Response)=> res.json())
    .catch((error:any) =>
        Observable.throw("An error occured when fetching all species"));
  }
  addNewCharacter(char:Character): Observable<any>{
    let url = this.g_url+"characters";
    let gender;
    switch(char.gender){
      case(0): gender = 'male';break;
      case(1): gender = 'female';break;
      default: gender = 'n/a';
    }

    let body = {
      name:char.name,
      species:char.species,
      gender:gender,
      homeworld:char.homeworld};

    return this.http.post(url,body)
    .map((res:Response)=> res.json())
    .catch((error:any) =>
        Observable.throw("An error occured when adding new character"));
  }
  deleteCharacter(id:number): Observable<any>{
    let url = this.g_url+"characters/"+id.toString();

    return this.http.delete(url)
    .map((res:Response)=> res.json())
    .catch((error:any) =>
            Observable.throw("An error occured when removing character"));
  }
  updateCharacter(char:Character): Observable<any>{
    let url = this.g_url+"characters/"+char.id;
    let body = {
      name:char.name,
      species:char.species,
      gender:char.gender,
      homeworld:char.homeworld};

    return this.http.put(url, body)
    .map((res:Response)=>res.json())
    .catch((error:any)=>
          Observable.throw("An error occured when updating character"));
  }

}
