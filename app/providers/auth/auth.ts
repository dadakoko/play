import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Storage, LocalStorage} from 'ionic-angular';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Endpoints} from '../endpoints/endpoints';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


/*
 Generated class for the Jwt provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Auth {

  contentHeader: Headers = new Headers({"Content-Type": "application/json"});
  jwtHelper: JwtHelper = new JwtHelper();
  local: Storage = new Storage(LocalStorage);
  user: any;
  error: string;

  constructor(private http: Http, private endpoints: Endpoints) {

    this.local.get('id_token').then(token => {
      this.setUser(token);
    }).catch(error => {
      //console.log(error);
    });

  }

  login(credentials) {
    let observable = this.http.post(this.endpoints.getLogin(),
        JSON.stringify(credentials),{ headers: this.contentHeader })
        .map(res => { return res.json()})

    return observable.toPromise().then((data)=>{
      this.authSuccess(data.token)
      return data;
    })
  }

  signup(credentials) {

    let observable = this.http.post(this.endpoints.getSignup(),
        JSON.stringify(credentials),{ headers: this.contentHeader })
        .map(res => { return res.json()})

    return observable.toPromise().then((data)=>{
      //this.authSuccess(data.token)
      return data;
    })
  }

  logout() {
    this.local.remove('id_token');
    this.user = null;
  }


  authSuccess(token) {
    this.local.set('id_token', token);
    this.setUser(token);
  }

  setUser(token){
    this.user = this.jwtHelper.decodeToken(token);
  }

  authenticated() {
    return tokenNotExpired();
  }


}
