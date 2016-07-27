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
    
    @ViewChild("videoRef")
    private _videoRef:ElementRef;


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

    onClickVideoAction(action) {

        switch (action.type) {
            case ActionType.CROP:
            {
                alert("Case CROP");
                break;
            }
            case ActionType.RATE:
            {
                this._videoRef.nativeElement.playbackRate = action.value;
                break;
            }
            default:
            {
                alert("unknown action");
            }

        }
    }

}
