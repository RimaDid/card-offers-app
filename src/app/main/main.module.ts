import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { ComponentsModule } from './../components/components.module';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ComponentsModule,
    MainRoutingModule
  ],
  providers: [],
})
export class MainModule { }
