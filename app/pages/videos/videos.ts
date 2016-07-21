import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Routes} from '../../providers/routes/routes';
import {Videos as VideosProvider} from '../../providers/videos/videos'
import {Auth} from "../../providers/auth/auth";

/*
 Generated class for the VideosPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/videos/videos.html',
})
export class VideosPage {

  items:any = []
  username:string;

  /** Not normally mandatory but create bugs if ommited. **/
  static get parameters() {
    return [[NavController], [Routes],[VideosProvider],[Auth]];
  }
  constructor(private nav: NavController, private routes:Routes, private videosProvider:VideosProvider, private auth:Auth) {
  }

  onPageLoaded(){
    this.videosProvider.load().then((data)=>{
      this.items = data.data;
    });
    this.username = this.auth.user.username;
  }

  selectItem(id){
    this.nav.insert(0,this.routes.getPage(this.routes.VIDEO),{id:id})
  }

  logout(){
    this.auth.logout()
    this.nav.setRoot(this.routes.getRootPage())
  }

  addVideo(){
    this.nav.insert(0,this.routes.getPage(this.routes.ADD))
  }


}
