import {Component, Input, EventEmitter, Output, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Rx';


export enum ActionType {
  RATE = 1,
  CROP = 2
};


/*
  Generated class for the Videocontrols component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'videocontrols',
  templateUrl: 'build/components/videocontrols/videocontrols.html',
  styles: [`.outer
            {
                width:100%;
                text-align: center;
            }
            .inner
            {
                display: inline-block;
    `]
})
export class Videocontrols {


  speed: number;
  crop: any = {lower: 0, upper: 60};

  @Output() onAction: EventEmitter<any> = new EventEmitter();
  
  constructor() {
  }

  setPlaybackRate(){
    this.onAction.emit({type:ActionType.RATE,value:this.speed/10});
  }

  setCrop(){
    this.onAction.emit({type:ActionType.CROP,value:this.crop});
  }

}
