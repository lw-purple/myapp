import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {File} from '@ionic-native/file';
/*
  Generated class for the NativeServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NativeServiceProvider {

  constructor(
    public http: Http,
    private imagePicker: ImagePicker,
    private file: File,
    private camera: Camera
  ) {
    console.log('Hello NativeServiceProvider Provider');
  }
   /**
   * 通过图库选择多图
   * @param options
   * @return {Promise<T>}
   */
  getMultiplePicture(options = {}): Promise<any> {
    let that = this;
    let destinationType = options['destinationType'] || 0;//0:base64字符串,1:图片url
    return new Promise((resolve) => {
      this.imagePicker.getPictures(Object.assign({
        maximumImagesCount: 6,
        width: 1000,//缩放图像的宽度（像素）
        height: 1000,//缩放图像的高度（像素）
        quality: 100//图像质量，范围为0 - 100
      }, options)).then(files => {
        if (destinationType === 1) {
          resolve(files);
        } else {
          let imgBase64s = [];//base64字符串数组
          for (let fileUrl of files) {
            that.convertImgToBase64(fileUrl, base64 => {
              imgBase64s.push(base64);
              if (imgBase64s.length === files.length) {
                resolve(imgBase64s);
              }
            });
          }
        }
      }).catch(err => {
        // this.warn('getMultiplePicture:' + err);
        // this.showToast('获取照片失败');
      });
    });
  };
  /**
   * 根据图片绝对路径转化为base64字符串
   * @param url 绝对路径
   * @param callback 回调函数
   */
  convertImgToBase64(url: string, callback) {
    this.getFileContentAsBase64(url, function (base64Image) {
      callback.call(this, base64Image.substring(base64Image.indexOf(';base64,') + 8));
    })
  }

  /**
   * 
   * 
   * @private
   * @param {string} path 
   * @param {any} callback 
   * 
   * @memberOf NativeServiceProvider
   */
  private getFileContentAsBase64(path: string, callback) {
    function fail(err) {
      console.log('Cannot found requested file' + err);
    }

    function gotFile(fileEntry) {
      fileEntry.file(function (file) {
        let reader = new FileReader();
        reader.onloadend = function (e) {
          let content = this.result;
          callback(content);
        };
        reader.readAsDataURL(file);
      });
    }

    this.file.resolveLocalFilesystemUrl(path).then(fileEnter => gotFile(fileEnter)).catch(err => fail(err));
    // window['resolveLocalFileSystemURL'](path, gotFile, fail);
  }

   /**
   * 使用cordova-plugin-camera获取照片
   * @param options
   * @returns {Promise<string>}
   */
  getPicture(options: CameraOptions = {}): Promise<string> {
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
      destinationType: this.camera.DestinationType.DATA_URL,//默认返回base64字符串,DATA_URL:base64   FILE_URI:图片路径
      quality: 100,//图像质量，范围为0 - 100
      allowEdit: true,//选择图片前是否允许编辑
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 1000,//缩放图像的宽度（像素）
      targetHeight: 1000,//缩放图像的高度（像素）
      saveToPhotoAlbum: true,//是否保存到相册
      correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
    }, options);
    return new Promise((resolve) => {
      this.camera.getPicture(ops).then((imgData: string) => {
        resolve(imgData);
      }, (err) => {
        // err == 20 && this.showToast('没有权限,请在设置中开启权限');
        // this.warn('getPicture:' + err)
      });
    });
  };
  
  /**
   * 通过拍照获取照片
   * @param options
   * @return {Promise<string>}
   */
  getPictureByCamera(options: CameraOptions = {}): Promise<string> {
    return new Promise((resolve) => {
      this.getPicture(Object.assign({
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
      }, options)).then((imgData: string) => {
        resolve(imgData);
      }).catch(err => {
        // String(err).indexOf('cancel') != -1 ? this.showToast('取消拍照', 1500) : this.showToast('获取照片失败');
      });
    });
  };

}
