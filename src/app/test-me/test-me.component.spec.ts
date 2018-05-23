import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { BackendService } from "../services/backend.service";
import { PagerService } from "../services/pager.service";
import { MockBackend } from "../services/mock_backend.service";
import { MockPager } from "../services/mock_pager.service";
import { TestMeComponent} from './test-me.component';
import {CHARACTER_OBJECT, CHARACTER_TAB, SPECIES_TAB} from '../models/mocks';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FormBuilder } from '@angular/forms';

describe('TestMeComponent', () => {
  let component: TestMeComponent;
  let backendService: BackendService;
  let pagerService: PagerService;
  let fixture: ComponentFixture<TestMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestMeComponent ],
      providers:[
        {provide: BackendService, useClass: MockBackend},
        {provide: PagerService, useClass: MockPager},
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMeComponent);
    backendService = TestBed.get(BackendService);
    pagerService = TestBed.get(PagerService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get characters',() =>{
    expect(component.characters).toBe(CHARACTER_TAB)
  })
  it('should have 10 pagedCharacters',() =>{
    component.setPage(1);
    expect(component.pagedCharacters.length).toBe(10)
  })
  it('should set edited row',()=>{
    component.toggleEdit(1);
    expect(component.editedRow).toBe(1);
    expect(component.modified).toBe(component.pagedCharacters[1]);
  });
  it('should turn inputs do normal when edit buton hit',()=>{
    component.edit(1);
    expect(component.editedRow).toBe(null);
  })
  it('should sort characters by name',()=>{
    component.sortBy('name');
    expect(component.characters[0].name[0]<component.characters[10].name[0]).toBe(true)
  })
  it('should sort characters by species',()=>{
    component.sortBy('species');
    expect(component.characters[0].species[0]<component.characters[10].species[0]).toBe(true)
  })
  it('should sort characters by gender',()=>{
    component.sortBy('gender');
    expect(component.characters[0].gender<component.characters[10].gender).toBe(true)
  })
});
