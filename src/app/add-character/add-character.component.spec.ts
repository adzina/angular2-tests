import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs/Rx';
import { BackendService } from "../services/backend.service";
import { MockBackend } from "../services/mock_backend.service";
import {CHARACTER_OBJECT, CHARACTER_TAB, SPECIES_TAB} from '../models/mocks';

import { AddCharacterComponent} from './add-character.component';

describe('TestMeComponent', () => {
  let component: AddCharacterComponent;
  let backendService: BackendService;
  let fixture: ComponentFixture<AddCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCharacterComponent ],
      providers:[
        {provide: BackendService, useClass: MockBackend},
        FormBuilder
      ],
      imports: [RouterTestingModule.withRoutes([])],
      schemas: [NO_ERRORS_SCHEMA]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCharacterComponent);
    backendService = TestBed.get(BackendService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get the species',()=>{
    component.ngOnInit();
    expect(component.allspecies).toBe(SPECIES_TAB);
  })
  it('should reset the form attempts',()=>{
    component.sendRequest();
    expect(component.formSubmitAttempt).toBe(false);
  })
  it('should mark filled fields as valid',()=>{
    component.characterForm.controls['name'].setValue('Jake');
    expect(component.isFieldInvalid('name')).toBe(false);
  })
  it('should mark empty fields as invalid',()=>{
    component.formSubmitAttempt = true
    expect(component.isFieldInvalid('name')).toBe(true);
  })

});
