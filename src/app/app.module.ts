import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListViewComponent } from './list-view/list-view.component';
import { AddCharacterComponent } from './add-character/add-character.component';

import { BackendService } from "./services/backend.service";
import { PagerService } from './services/pager.service';


import { TestMeComponent} from './test-me/test-me.component';

@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    AddCharacterComponent,
    TestMeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BackendService,
    PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
