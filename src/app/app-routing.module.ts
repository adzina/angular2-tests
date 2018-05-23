import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListViewComponent } from './list-view/list-view.component';
import { AddCharacterComponent } from './add-character/add-character.component'
const routes: Routes = [
  {
    path: '',
    component: ListViewComponent
  },
  {
    path: 'add-character',
    component: AddCharacterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
