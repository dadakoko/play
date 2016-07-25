import { Injectable, Pipe } from '@angular/core';
import {Observable} from 'rxjs/Rx';
/*
 Generated class for the GroupBy pipe.
 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
  name: 'groupBy',
  pure: false,
})
@Injectable()
export class GroupBy {

  transform(value: Array<any>, property: string="title") {

    let results = []
    Observable.from(value).groupBy(
        (item:any)=> { return item.attributes[property].substring(0,1); },
        (item:any)=> { return item })
        .flatMap(group => group.toArray())
        .subscribe((data)=>{
          results.push({value:data[0].attributes[property].substring(0,1),list:data});
        })
    return results;
  }
}