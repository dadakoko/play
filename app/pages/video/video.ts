import { Component, ViewChild } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {Routes} from '../../providers/routes/routes';
import {Video} from "../../models/video.model";
import {Auth} from "../../providers/auth/auth";
import {Videos as VideosProvider} from '../../providers/videos/videos'


/*
 Generated class for the PlacePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/video/video.html',
})
export class VideoPage {

  selectedVideo:any;

  /** Not normally mandatory but create bugs if ommited. **/
  static get parameters() {
    return [[NavController],[NavParams], [Routes],[VideosProvider]];
  }
  constructor(private nav: NavController, private params: NavParams, private routes:Routes, private videoProvider:VideosProvider) {
    const selectedId = params.data.id;
    this.selectedVideo = videoProvider.getVideoById(selectedId)
    let url = "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4";
    //this.selectedVideo = {name:"video bla",description:"c est bla",url:url};
    this.selectedVideo.attributes.url = url;
  }

  onClickBack(){
    this.nav.setRoot(this.routes.getPage(this.routes.VIDEOS))
  }

}
