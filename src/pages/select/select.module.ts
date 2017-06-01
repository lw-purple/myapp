import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectPage } from './select';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ThreeComponentModule } from '../../components/three/three.module'
@NgModule({
  declarations: [
    SelectPage,
    
  ],
  imports: [
    IonicPageModule.forChild(SelectPage),
    ThreeComponentModule
  ],
  exports: [
    SelectPage
  ],
  providers:[
    BarcodeScanner
  ]
})
export class SelectPageModule {}
