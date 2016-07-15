import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Endpoints} from "../endpoints/endpoints";
import {Video} from "../../models/video.model";
import {AuthHttp} from "angular2-jwt";

/*
  Generated class for the Videos provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Videos {

  data: any;

  constructor(private authHttp: AuthHttp, private endpoints: Endpoints) {
    this.data = null;
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.authHttp.get(this.endpoints.getVideos())
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
    });
  }

  getVideoById(id){
    let selected = null
    this.data.map((video)=>{
      if(video.id==id) selected = video; return selected;
    })
    return selected
  }


}

