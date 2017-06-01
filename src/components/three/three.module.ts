import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThreeComponent } from './three';

@NgModule({
  declarations: [
    ThreeComponent,
  ],
  imports: [
    IonicPageModule.forChild(ThreeComponent),
  ],
  exports: [
    ThreeComponent
  ]
})
export class ThreeComponentModule {}
