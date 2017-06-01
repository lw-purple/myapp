import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectPicComponent } from './select-pic';

@NgModule({
  declarations: [
    SelectPicComponent,
  ],
  imports: [
    IonicPageModule.forChild(SelectPicComponent),
  ],
  exports: [
    SelectPicComponent
  ]
})
export class SelectPicComponentModule {}
