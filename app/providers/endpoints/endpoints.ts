import { Injectable } from '@angular/core';

/*
 Generated class for the Endpoints provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Endpoints {

  // API_PATH: string = "http://??.herokuapp.com"
  API_PATH: string = "http://1288378b.ngrok.io"
  // API_PATH: string = "http://localhost:3000"

  getLogin(){
    return this.API_PATH + "/authenticate"
  }

  getSignup(){
    return this.API_PATH + "/users"
  }

  getVideos(){
    return this.API_PATH + "/videos";
  }

}
