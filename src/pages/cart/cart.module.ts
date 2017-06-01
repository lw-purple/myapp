import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartPage } from './cart';
import { SelectPicComponentModule} from '../../components/select-pic/select-pic.module'
@NgModule({
  declarations: [
    CartPage,
  ],
  imports: [
    SelectPicComponentModule,
    IonicPageModule.forChild(CartPage),
  ],
  exports: [
    CartPage
  ]
})
export class CartPageModule {}
