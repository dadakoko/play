import { Injectable} from '@angular/core';
import {HomePage} from '../../pages/home/home';
import {LoginPage} from '../../pages/login/login';
import {SignupPage} from '../../pages/signup/signup';
import {Auth} from '../../providers/auth/auth'
import {VideoPage} from "../../pages/video/video";
import {VideosPage} from "../../pages/videos/videos";
import {AddPage} from "../../pages/add/add";

@Injectable()
export class Routes {
  routes:Object = {};

  HOME:string="home";
  LOGIN:string="login";
  SIGNUP:string="signup";
  VIDEO:string="video";
  VIDEOS:string="videos";
  ADD:string="add";

  constructor(private auth:Auth){
    this.routes[this.HOME]=HomePage;
    this.routes[this.LOGIN]=LoginPage;
    this.routes[this.SIGNUP]=SignupPage;
    this.routes[this.VIDEO]=VideoPage;
    this.routes[this.VIDEOS]=VideosPage;
    this.routes[this.ADD]=AddPage;
  }

  getPage(id){
    const route = this.routes[id];
    return route;
  }

  getRootPage(){
    let root = (this.auth.authenticated()) ? this.getPage(this.VIDEOS) : this.getPage(this.HOME)
    return root;
  }

}
