import { Injectable} from '@angular/core';
import {HomePage} from '../../pages/home/home';
import {LoginPage} from '../../pages/login/login';
import {SignupPage} from '../../pages/signup/signup';
import {Auth} from '../../providers/auth/auth'
import {VideoPage} from "../../pages/video/video";

@Injectable()
export class Routes {
  routes:Object = {};

  HOME:string="home";
  LOGIN:string="login";
  SIGNUP:string="signup";
  VIDEO:string="video";

  constructor(private auth:Auth){
    this.routes[this.HOME]=HomePage;
    this.routes[this.LOGIN]=LoginPage;
    this.routes[this.SIGNUP]=SignupPage;
    this.routes[this.VIDEO]=VideoPage;
  }

  getPage(id){
    const route = this.routes[id];
    return route;
  }

  getRootPage(){
    let root = (this.auth.authenticated()) ? this.getPage(this.HOME) : this.getPage(this.LOGIN)
    return root;
  }

}
