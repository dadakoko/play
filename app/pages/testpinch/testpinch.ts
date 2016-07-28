import {Component, ViewChild, ElementRef} from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the TestpinchPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/testpinch/testpinch.html',
})
export class TestpinchPage {

  @ViewChild("content")
  private _ref:ElementRef;
  
  private _contentElement;


  constructor(private nav: NavController) {

  }

  ionViewDidEnter() {
    this._contentElement = this._ref.nativeElement;
    //var mc = new Hammer(this._videoElement);

    console.log("HAMMMMMMERERERERER");
    var hammertime = new Hammer(this._contentElement);
    hammertime.on('pinchin pinchout', function(ev) {
      console.log(ev.type);
    });
    hammertime.get('pinch').set({ enable:true });


    // // create a hammer instance
    // var mc = new Hammer.Manager(this._contentElement);
    //
    // // add the pinch recognizer
    // mc.add(new Hammer.Pinch());
    //
    // // listen to the events!
    // mc.on("pinch", function (ev) {
    //   console.log(ev.scale);
    // });

    // var pinch = new Hammer.Pinch();
    // mc.add([pinch]);

    // mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    // mc.get('pinch').set({enable: true});

    // mc.on("pinch panleft panright panup pandown tap press", function(ev) {
    //     console.log(ev.type +" gesture detected.");
    // });
    // mc.on("pinch", function (ev) {
    //     console.log(ev.type + " gesture detected.");
    // });

    // this._videoGesture.on('panleft panright panup pandown', (ev) => {
    //     this._panMove(ev);
    // });
    // this._videoGesture.get('pinch').set({ enable: true });
    // this._videoGesture.on('pinch', (ev) => {
    //     this.pinchEvent(ev);
    // });


  }


  }
