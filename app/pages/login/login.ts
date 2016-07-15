import { Component } from '@angular/core';
import { NavController, Modal } from 'ionic-angular';
import {Routes} from '../../providers/routes/routes';
import {Auth} from '../../providers/auth/auth';
/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  email:string;
  password:string;
  error:string;

  /** Not normally mandatory but create bugs if ommited. **/
  static get parameters() {
    return [[NavController], [Routes], [Auth]];
  }
  constructor(private nav: NavController, private routes:Routes, private auth:Auth) {
  }

  login(){
    this.auth.login({identifier:this.email,password:this.password })
        .then((success)=>{

          this.goPage();

        },(error)=>{
          this.error = error._body;
        })

  }

  goPage(){
    this.nav.push(this.routes.getPage(this.routes.VIDEO))
  }

  openSignup(){
    let modal = Modal.create(this.routes.getPage(this.routes.SIGNUP));
    this.nav.present(modal);
  }

}
