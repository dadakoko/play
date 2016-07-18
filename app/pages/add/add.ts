import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Routes} from "../../providers/routes/routes";
import {Camera} from "ionic-native";

/*
  Generated class for the AddPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/add/add.html',
})
export class AddPage {

  public base64Image: string;

  /** Not normally mandatory but create bugs if ommited. **/
  static get parameters() {
    return [[NavController], [Routes]];
  }
  constructor(private nav: NavController, private routes:Routes, private platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // console.log(navigator.device.capture)
    });
  }

  onClickBack(){
    this.nav.setRoot(this.routes.getPage(this.routes.VIDEOS))
  }


  getPicture(){

    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 200,
      targetHeight: 200
    }).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (error) => {
      console.log("error ",error)
    });

    //navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 1});


  }


}
