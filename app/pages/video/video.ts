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
                case "press":
                    this.tap(ev);
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
                this._videoElement.style.left = this.left + ev.deltaX + 'px';
                break;
            case "panup":
            case "pandown":
                this._videoElement.style.top = this.top + ev.deltaY + 'px';
                break;
            default:
                console.log("unused ev ", ev.type);
        }
        ev.preventDefault();
    }

    tap(ev) {
        let { pointers} = ev;
        console.log('tap count : ', JSON.stringify(pointers));
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
