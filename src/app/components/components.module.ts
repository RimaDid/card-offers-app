import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardComponent } from './card/card.component';
import { NoDataComponent } from './no-data/no-data.component';

@NgModule({
  declarations: [
    CardComponent,
    NoDataComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [CardComponent, NoDataComponent],
})
export class ComponentsModule { }
