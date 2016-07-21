import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Endpoints} from "../endpoints/endpoints";
import {Video} from "../../models/video.model";
import {AuthHttp} from "angular2-jwt";
import {Headers} from "@angular/http";

/*
  Generated class for the Videos provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Videos {

  contentHeader: Headers = new Headers({"Content-Type": "application/json"});
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
    this.data.data.map((video)=>{
      if(video.id==id) selected = video; return selected;
    })
    return selected
  }

  add(video){
    let observable = this.authHttp.post(this.endpoints.getVideos(),
        JSON.stringify(video),{headers: this.contentHeader})
        .map(res => {return res.json()});

    return observable.toPromise().then((data)=>{
      return data;
    })

  }


}

