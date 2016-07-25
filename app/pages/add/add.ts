import {Component} from '@angular/core';
import {NavController, Platform, Alert} from 'ionic-angular';
import {Routes} from "../../providers/routes/routes";
import {Camera, Transfer, MediaFile, CaptureError, MediaCapture} from "ionic-native";
import {NgZone} from '@angular/core';
import * as _ from 'lodash';
import {Auth} from "../../providers/auth/auth";
import {Videos as VideosProvider} from '../../providers/videos/videos'
import {ControlGroup, Validators, FORM_DIRECTIVES, FormBuilder} from "@angular/common";

/*
 Generated class for the AddPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    templateUrl: 'build/pages/add/add.html',
    directives: [[FORM_DIRECTIVES]]
})
export class AddPage {

    videoUri:string;
    uploading:boolean = true;
    total:number;
    progress:number;
    title:string;
    description:string;
    artist:string;
    videoUriTemp:string;
    thumbnailUri:string;
    videoForm: ControlGroup;


    /** Not normally mandatory but create bugs if ommited. **/
    static get parameters() {
        return [[NavController], [Routes], [Platform], [NgZone], [VideosProvider], [Auth],[FormBuilder]];
    }

    constructor(private nav:NavController, private routes:Routes,
                private platform:Platform, private ngZone:NgZone,
                private videosProvider:VideosProvider, private auth:Auth,
                private formBuilder: FormBuilder) {

        this.videoForm = formBuilder.group({
            title: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            artist: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            description: ['', Validators.compose([Validators.maxLength(100), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
        });

    }

    onClickBack() {
        this.nav.setRoot(this.routes.getPage(this.routes.VIDEOS))
    }
    
    getVideo(){
        MediaCapture.captureVideo({limit: 1})
            .then((data:MediaFile[]) => {
                    this.videoUriTemp = data[0].fullPath;
                    this.platform.ready().then(() => {
                        this.uploadVideo();
                    });
                },
                (err:CaptureError) =>
                    console.error(err)
            );

    }

    pickVideo() {

        Camera.getPicture({
            mediaType: Camera.MediaType.VIDEO,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        }).then((videoURI) => {
            console.log("my video: ", videoURI);
            this.videoUriTemp = videoURI;
            this.platform.ready().then(() => {
                this.uploadVideo();
            });
        }, (error) => {
            console.error("error ", error)
        });

    }

    done = ():void => {
        this.nav.setRoot(this.routes.getPage(this.routes.VIDEOS))
    }
    
    videoSuccess = (result:any):void => {
        this.uploading = true;
        let res = JSON.parse(result.response);
        this.videoUri = res[0];
        this.thumbnailUri = res[1];


        let video = {
            "data": {
                "type": "videos",
                "attributes": {
                    "title": this.title,
                    "artist": this.artist,
                    "description": this.description,
                    "videourl": this.videoUri,
                    "thumbnailurl": this.thumbnailUri,
                    "author": this.auth.user.userId
                }
            }
        }

        this.videosProvider.add(video).then(
            data=> {
                console.log(data);
                //this.doAlert(data);
                this.nav.insert(0, this.routes.getPage(this.routes.VIDEOS))
            }
        );

    }

    doAlert(video) {
        let alert = Alert.create({
            title: 'New Video!',
            subTitle: 'Your video is stored and available',
            buttons: ['OK']
        });
        this.nav.present(alert);
    }

    failed = (err:any):void => {
        let code = err.code;
        alert("Failed to upload image. Code: " + code);
    }

    onProgress = (progressEvent:ProgressEvent):void => {
        this.ngZone.run(() => {
            if (progressEvent.lengthComputable) {
                let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                console.log(progress);
                this.progress = progress
            }
        });
    }
    
    uploadVideo = ():void => {
        this.uploading = false;
        let ft = new Transfer();
        let filename = new Date().toISOString() + ".mov";
        let options = {
            fileKey: 'file',
            fileName: filename,
            mimeType: 'video/quicktime',
            chunkedMode: false,
            headers: {
                'Content-Type': undefined
            },
            params: {
                fileName: filename
            }
        };
        ft.onProgress(this.onProgress);
        ft.upload(this.videoUriTemp, "http://1288378b.ngrok.io/videos/upload", options, false)
            .then((result:any) => {
                this.videoSuccess(result);
            }).catch((error:any) => {
            this.failed(error);
        });
    }

}
