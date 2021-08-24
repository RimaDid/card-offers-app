import { SidenavComponent } from './sidenav/sidenav.component';
import { NgModule } from '@angular/core';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    MainComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MainRoutingModule
  ],
  providers: [],
})
export class MainModule { }
