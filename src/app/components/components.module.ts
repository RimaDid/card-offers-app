import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardComponent } from './card/card.component';
import { NoDataComponent } from './no-data/no-data.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    CardComponent,
    NoDataComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [CardComponent, NoDataComponent, SidenavComponent],
})
export class ComponentsModule { }
