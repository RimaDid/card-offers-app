import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from 'src/app/components/components.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { OffersService } from './../../services/offers.service';
import { FavoriteOffersService } from './../../services/favorit-offers.service';
import { DataManipulationService } from '../../services/data-manipulation.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    DashboardRoutingModule,
    NgxSpinnerModule
  ],
  providers: [
    FavoriteOffersService,
    OffersService,
    DataManipulationService,
  ],
})
export class DashboardModule { }
