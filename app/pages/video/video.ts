import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams, Gesture} from 'ionic-angular';
import {Routes} from '../../providers/routes/routes';
import {Videos as VideosProvider} from '../../providers/videos/videos'
import {Videocontrols, ActionType} from "../../components/videocontrols/videocontrols";


/*
 Generated class for the PlacePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    templateUrl: 'build/pages/video/video.html',
    directives: [Videocontrols]
})
export class VideoPage {

    selectedVideo:any;

    @ViewChild("myvideo")
    private _videoRef:ElementRef;

    private isDurationSet;
    private duration;

    crop:any = {lower: 0, upper: 0};
    loop:boolean;
    private _videoElement;
    private mc;

    /** Not normally mandatory but create bugs if ommited. **/
    static get parameters() {
        return [[NavController], [NavParams], [Routes], [VideosProvider]];
    }

    constructor(private nav:NavController, private params:NavParams, private routes:Routes, private videoProvider:VideosProvider) {
        const selectedId = params.data.id;
        this.selectedVideo = videoProvider.getVideoById(selectedId)
    }

    ionViewDidEnter() {

        this._videoElement = this._videoRef.nativeElement;

        this._videoElement.style.width = 100+'%';
        this._videoElement.style.left = 0+'px';
        this._videoElement.style.top = 0+'px';

        this.mc = new Hammer(this._videoElement);

        this.mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
        this.mc.get('press').set({time:1000});

        this.mc.on("panstart panleft panright panup pandown tap press", (ev) => {
            switch (ev.type) {
                case "panleft":
                case "panright":
                case "panup":
                case "pandown":
                case "panstart":
                    this.pan(ev);
                    break;
                case "tap":
                    this.tap(ev);
                    break;
                case "press":
                    this._videoElement.style.width = 100+'%';
                    this._videoElement.style.left = 0+'px';
                    this._videoElement.style.top = 0+'px';
                    break;
                default:
                    console.log("unused ev ", ev.type);
            }

        });

    }

    left:number;
    top:number;

    pan(ev) {
        switch (ev.type) {
            case "panstart":
                this.left = +this._videoElement.style.left.split('px')[0];
                this.top = +this._videoElement.style.top.split('px')[0];
                break;
            case "panleft":
            case "panright":
                let newX = this.left + ev.deltaX;
                newX = (newX > 0) ? 0 : newX;
                newX = (newX < - this._videoElement.clientWidth + window.innerWidth) ? - this._videoElement.clientWidth + window.innerWidth : newX;
                this._videoElement.style.left = newX + 'px';
                break;
            case "panup":
            case "pandown":
                let newY = this.top + ev.deltaY;
                newY = (newY > 0) ? 0 : newY;
                newY = (newY < - this._videoElement.clientHeight + window.innerHeight) ? - this._videoElement.clientHeight + window.innerHeight : newY;
                this._videoElement.style.top = newY + 'px';
                break;
            default:
                console.log("unused ev ", ev.type);
        }
        ev.preventDefault();
    }

    tap(ev) {
        this._videoElement.style.width = parseInt(this._videoElement.style.width.split('%')[0])+10 + '%';
        ev.preventDefault();
    }

    ngOnDestroy() {
        this.mc.destroy();
    }

    onClickBack() {
        this.nav.setRoot(this.routes.getPage(this.routes.VIDEOS))
    }

    onDuration(ev) {
        this.isDurationSet = !isNaN(ev.target.duration);
        this.duration = ev.target.duration;
        this.crop.upper = ev.target.duration;
    }

    onTimeUpdate(ev) {
        let currenttime = this._videoRef.nativeElement.currentTime;
        let temptime = currenttime < this.crop.lower ? this.crop.lower : currenttime;
        let newtime = temptime > this.crop.upper ? this.crop.lower : temptime;
        if (newtime != currenttime) {
            this._videoRef.nativeElement.currentTime = newtime;
        }
        if (newtime != temptime && !this.loop) {
            this._videoRef.nativeElement.pause();
        }
    }

    onClickVideoAction(action) {

        switch (action.type) {
            case ActionType.CROP:
            {
                this.crop = action.value;
                break;
            }
            case ActionType.RATE:
            {
                this._videoRef.nativeElement.playbackRate = action.value;
                break;
            }
            case ActionType.LOOP:
            {
                this._videoRef.nativeElement.loop = action.value;
                this.loop = action.value;
                break;
            }
            case ActionType.STEP:
            {
                this._videoRef.nativeElement.pause();
                this._videoRef.nativeElement.currentTime += action.value;
                break;
            }
            case ActionType.PLAY:
            {
                this._videoRef.nativeElement.play();
                break;
            }
            case ActionType.PAUSE:
            {
                this._videoRef.nativeElement.pause();
                this._videoRef.nativeElement.currentTime = action.value;
                break;
            }
            default:
            {
                alert("unknown action");
            }

        }
    }

}
