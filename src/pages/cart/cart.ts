import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeServiceProvider } from '../../providers/native-service/native-service';
import {FileObj} from "../../model/FileObj";
/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  fileObjList: FileObj[] = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public NativeServiceProvider:NativeServiceProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
  onClick(){
    console.log(11)
  //  this.NativeServiceProvider.toImagePicker();
    
  }
}
