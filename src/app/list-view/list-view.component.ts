import { Component, OnInit } from '@angular/core';
import { Character } from '../models/character';
import { BackendService } from '../services/backend.service';
import { PagerService } from '../services/pager.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import * as _ from 'underscore';

@Component({
  selector: 'sl-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  constructor(private _backendService: BackendService,
    private _pagerService: PagerService) { }

  characters: Character[];
  pager: any = {};
  pagedCharacters: any[];
  search = new FormControl();
  formCtrlSub: Subscription;
  editedRow: any;
  modified: Character;
  ngOnInit() {
    this.editedRow = null;
    this.pagedCharacters = [];

    this.formCtrlSub = this.search.valueChanges
      .debounceTime(200)
      .subscribe(newSearch => this.onSearchChange(newSearch));

    this._backendService.getAllCharacters().subscribe(chars => {
      this.characters = chars;
      this.setPage(1);
    })
  }
  setPage(page: number) {
    if (page < 1) {
      return;
    }
    // get pager object from service
    this.pager = this._pagerService.getPager(this.characters.length, page);
    // get current page of items
    this.pagedCharacters = this.characters.slice(this.pager.startIndex,
      this.pager.endIndex + 1);
  }
  onSearchChange(searchValue: string) {
    this._backendService.fullTextSearch(searchValue).subscribe(chars => {
      this.characters = chars;
      this.setPage(this.pager.currentPage);
    })
  }
  //remove character
  remove(i: number) {
    this._backendService.deleteCharacter(this.pagedCharacters[i].id)
    .subscribe(resp => {
      this.onSearchChange("");
    })
  }
  //enable/disable editing of a row
  toggleEdit(id: number) {
    this.editedRow = id;
    this.modified = this.pagedCharacters[id];
  }
  //update character
  edit(id: number){
    this.editedRow = null;
    this._backendService.updateCharacter(this.pagedCharacters[id]);
  }
  //sort characters by field
  sortBy(field:string){
    this.characters.sort(function(a, b){
    if ( a[field] < b[field] )
        return -1;
    if ( a[field] > b[field] )
        return 1;
    return 0;
    });
    this.setPage(this.pager.currentPage);
  }
  ngOnDestroy() {
    this.formCtrlSub.unsubscribe();
  }
}
