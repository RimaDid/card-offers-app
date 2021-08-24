import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { OffersService } from './../../services/offers.service';
import { FavoriteOffersService } from './../../services/favorit-offers.service';

import { DashboardComponent } from './dashboard.component';
import { DataManipulationService } from 'src/app/services/data-manipulation.service';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    DashboardRoutingModule
  ],
  providers: [
    FavoriteOffersService,
    OffersService,
    DataManipulationService,
  ],
})
export class DashboardModule { }
