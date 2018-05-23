import { Component, OnInit, Renderer } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Character } from '../models/character';
import { Gender } from '../enums/gender.enum';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators,
        FormControl, FormControlName} from '@angular/forms';


const originFormControlNameNgOnChanges = FormControlName.prototype.ngOnChanges;

FormControlName.prototype.ngOnChanges = function () {
  const result = originFormControlNameNgOnChanges.apply(this, arguments);
  this.control.nativeElement = this.valueAccessor._elementRef.nativeElement;
  return result;
};

@Component({
  selector: 'sl-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.scss']
})
export class AddCharacterComponent implements OnInit {

  constructor(private _backendService:BackendService,
              private _router: Router,
              private _fb: FormBuilder,
              private _renderer: Renderer) { }
  public allspecies: string[];
  public character: Character;
  public characterForm: FormGroup;
  public formSubmitAttempt = false;
  public genderVal = Gender;
  public requestInProgress = false;
  ngOnInit() {
    this.characterForm = this._fb.group({
       name: ["", Validators.required],
       species: ["", Validators.required],
       gender: ["", Validators.required],
       homeworld: [""]
     });

    this.character={id:0,name:"",species:"",gender:Gender.none,homeworld:""}

    this._backendService.getAllSpecies().subscribe(species=>{
      this.allspecies=species;
    })
}
 isFieldInvalid(field: string) {
   return (
         (!this.characterForm.get(field).valid && this.characterForm.get(field).touched) ||
         (this.characterForm.get(field).untouched && this.formSubmitAttempt)
       );
 }

onSubmit() {
     this.formSubmitAttempt = true;
     if (!this.characterForm.valid) {
       this.validateAllFormFields(this.characterForm);
       return false;
     }
     this.sendRequest();
}

displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldInvalid(field),
      'has-feedback': this.isFieldInvalid(field)
    };
  }

//check if all fields are valid
validateAllFormFields(formGroup: any) {
  let invalid = <FormControl[]>Object.keys(this.characterForm.controls)
  .map(key => this.characterForm.controls[key]).filter(ctl => ctl.invalid);

  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    control.markAsTouched({ onlySelf: true });
  });
  if (invalid.length > 0) {
    let invalidElem: any = invalid[0];
    //focus first invalid element
    invalidElem.nativeElement.focus();
  }

}
  //send form data to backend
  sendRequest(){
    this.requestInProgress=true;
    this._backendService.addNewCharacter(this.character).subscribe( result => {
        this.requestInProgress=false;
      },
      error => {
        console.log(error);
      },
      () => {
        this.formSubmitAttempt = false;
        this.characterForm.reset();
      })
  }

}
