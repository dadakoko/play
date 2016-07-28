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

  load(id) {
    return new Promise(resolve => {
      this.authHttp.get(this.endpoints.getVideos()+'?author='+id)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data.data;
            resolve(data.data);
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

  add(video){
    let observable = this.authHttp.post(this.endpoints.getVideos(),
        JSON.stringify(video),{headers: this.contentHeader})
        .map(res => {return res.json()});

    return observable.toPromise();

  }


  deleteVideo(id) {
    let observable = this.authHttp.delete(this.endpoints.getVideos()+'/'+id)
        .map(res=>{return res.json()});

    return observable.toPromise();
  }
}

