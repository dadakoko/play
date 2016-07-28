import {Component, Input, EventEmitter, Output, NgZone, ElementRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Rx';


export enum ActionType {
    RATE = 1,
    CROP = 2,
    LOOP = 3,
    STEP = 4,
    PAUSE = 5,
    PLAY = 6
}
;


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
                background: white;
            }
            .inner
            {
                display: inline-block;
            }
            .item .item-inner{
                border-bottom: 0px;
            }
            .item-range ion-range
            {
                height: 25%;
            }
            .sliders
            {
                height: 90px;
                padding-top: 15px;
            }
            .hidden-icon
            {
                opacity: 0;            
            }
            .footer-toggle
            {
                position: absolute;
                bottom: 0px;
                height: 0%;
                max-height: 170px;
                width: 100%;
                overflow: hidden;
                transition: 0.6s all ease;
                z-index: 1;
            }
            .footer-toggle.open
            {
                height: 100%;
                max-height: 170px;
                transition: 0.6s all ease;
            }
    `]
})
export class Videocontrols {

    @ViewChild("mySliders")
    private _slidersRef:ElementRef;

    speed:number;
    crop:any = {lower: 0, upper: 0};
    _loop:boolean;

    @Input()
    video:any

    @Output() onAction:EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        this.crop.upper = this.video.duration * 10;
        this.speed = 10;
    }

    toggleAction(){
            this._slidersRef.nativeElement.classList.toggle('open');
    }

    resetCrop() {
        this.crop = {lower: 0, upper: this.video.duration * 10};
        this.setCrop();
    }

    loop() {
        this.onAction.emit({type: ActionType.LOOP, value: this._loop});
    }

    start() {
        this.onAction.emit({type: ActionType.PAUSE, value: 0});
    }

    stepback() {
        this.onAction.emit({type: ActionType.STEP, value: -0.1});
    }

    stepfor() {
        this.onAction.emit({type: ActionType.STEP, value: 0.1});
    }

    end() {
        this.onAction.emit({type: ActionType.PAUSE, value: this.video.duration});
    }

    play() {
        this.onAction.emit({type: ActionType.PLAY});
    }

    resetPlaybackRate() {
        this.speed = 10;
        this.setPlaybackRate();
    }

    setPlaybackRate() {
        this.onAction.emit({type: ActionType.RATE, value: this.speed / 10});
    }

    setCrop() {
        this.onAction.emit({type: ActionType.CROP, value: {lower: this.crop.lower / 10, upper: this.crop.upper / 10}});
    }

}
