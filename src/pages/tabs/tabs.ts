import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Platform, Tabs, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabs: Tabs;
  backButtonPressed: boolean = false;
  itimer = null;

  tab1Root: any = 'SelectPage';
  tab2Root: any = 'BrandPage';
  tab3Root: any = 'CartPage';
  tab4Root: any = 'MinePage';

  constructor(public navCtrl: NavController, public platform: Platform, public toastCtrl: ToastController) {
    this.pageBack();
    //this.initjp();
    
  }
  pageBack() {

    this.platform.registerBackButtonAction((): any => {

      // if (this.UserService.isopenimg) {
      //   this.UserService.galleryOBJ.close();
      //   this.UserService.isopenimg = false;
      //   return false;
      // }

      let activeVC = this.navCtrl.getActive();
      let page = activeVC.instance;
      page.tabs
      if (!(page instanceof TabsPage)) {
        if (!this.navCtrl.canGoBack()) {
          return this.showExit();
        }
        return this.navCtrl.pop();
      }
      let tabs = page.tabs;
      let activeNav = tabs.getSelected();
      if (!activeNav.canGoBack()) {
        return this.showExit();
      }
      return activeNav.pop();

    }, 101);
  }

  //双击退出提示框
  showExit() {
    var _that = this;
    if (this.backButtonPressed) {
      this.platform.exitApp();
    } else {
      this.presentToast();
      this.backButtonPressed = true;
      if (this.itimer) {
        clearTimeout(this.itimer);
      }
      this.itimer = setTimeout(() => {
        _that.backButtonPressed = false
      }, 2000);
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: '再次点击返回退出APP',
      duration: 2000
    });
    toast.present();
  }

}
