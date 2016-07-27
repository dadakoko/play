import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Routes} from '../../providers/routes/routes';
import {Video} from "../../models/video.model";
import {Auth} from "../../providers/auth/auth";
import {Videos as VideosProvider} from '../../providers/videos/videos'
import {Videocontrols, ActionType} from "../../components/videocontrols/videocontrols";


/*
 Generated class for the PlacePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    templateUrl: 'build/pages/video/video.html',
    directives:[Videocontrols]
})
export class VideoPage {

    selectedVideo:any;
    
    @ViewChild("myvideo")
    private _videoRef:ElementRef;

    private isDurationSet;
    private duration;

    crop: any = {lower: 0, upper: 0};
    loop:boolean;

    /** Not normally mandatory but create bugs if ommited. **/
    static get parameters() {
        return [[NavController], [NavParams], [Routes], [VideosProvider]];
    }

    constructor(private nav:NavController, private params:NavParams, private routes:Routes, private videoProvider:VideosProvider) {
        const selectedId = params.data.id;
        this.selectedVideo = videoProvider.getVideoById(selectedId)
    }

    onClickBack() {
        this.nav.setRoot(this.routes.getPage(this.routes.VIDEOS))
    }
    
    onDuration(ev){
        this.isDurationSet = !isNaN(ev.target.duration);
        this.duration = ev.target.duration;
        this.crop.upper = ev.target.duration;
    }

    onTimeUpdate(ev){
        let currenttime = this._videoRef.nativeElement.currentTime;
        let temptime = currenttime<this.crop.lower?this.crop.lower:currenttime;
        let newtime = temptime>this.crop.upper?this.crop.lower:temptime;
        if(newtime!=currenttime) {
            this._videoRef.nativeElement.currentTime = newtime;
        }
        if(newtime!=temptime&&!this.loop){
            this._videoRef.nativeElement.pause();
            console.log(newtime);
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
                this.loop=action.value;
                break;
            }
            case ActionType.STEP:
            {
                this._videoRef.nativeElement.currentTime+=action.value;
                break;
            }
            default:
            {
                alert("unknown action");
            }

        }
    }

}
