import {Component, Input, EventEmitter, Output, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Rx';


export enum ActionType {
  RATE = 1,
  CROP = 2,
  LOOP = 3,
  STEP = 4
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
            }
    `]
})
export class Videocontrols {


  speed: number;
  crop: any = {lower: 0, upper: 0};
  _loop:boolean;
  
  @Input()
  video:any

  @Output() onAction: EventEmitter<any> = new EventEmitter();
  
  constructor() {
  }

  ngOnInit() {
    this.crop.upper=this.video.duration*10;
    this.speed=10;
  }

  resetCrop(){
    this.crop ={lower:0,upper:this.video.duration*10};
    this.setCrop();
  }
  
  loop(){
    this.onAction.emit({type:ActionType.LOOP,value:this._loop});
  }

  step(){
    this.onAction.emit({type:ActionType.STEP,value:0.1});
  }
  
  resetPlaybackRate(){
    this.speed=10;
    this.setPlaybackRate();
  }
  
  setPlaybackRate(){
    this.onAction.emit({type:ActionType.RATE,value:this.speed/10});
  }

  setCrop(){
    this.onAction.emit({type:ActionType.CROP,value:{lower: this.crop.lower/10, upper: this.crop.upper/10}});
  }

}
