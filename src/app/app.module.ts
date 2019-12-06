import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FlipperMenuModule } from 'flipper-menu';
import { AppRoutingModule } from './app-routing.module';
import { TestingComponentComponent } from './testing-component/testing-component.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlipperButtonModule } from 'flipper-button';


@NgModule({
  declarations: [
    AppComponent,
    TestingComponentComponent
  ],
  imports: [
    BrowserModule,

    FlipperButtonModule,
    FlipperMenuModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

