import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Routes} from "../../providers/routes/routes";
import {Camera, Transfer, MediaFile, CaptureError, MediaCapture} from "ionic-native";
import {NgZone} from '@angular/core';
import * as _ from 'lodash';
import {Auth} from "../../providers/auth/auth";
import {Videos as VideosProvider} from '../../providers/videos/videos'

/*
 Generated class for the AddPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    templateUrl: 'build/pages/add/add.html',
})
export class AddPage {

    base64Image:string;
    videoUri:string;
    uploading:boolean = true;
    total:number;
    progress:number;
    base64TempImage:string;
    title:string;
    description:string;
    artist:string;
    videoUriTemp:string;
    thumbnailUri:string;

    /** Not normally mandatory but create bugs if ommited. **/
    static get parameters() {
        return [[NavController], [Routes], [Platform], [NgZone], [VideosProvider], [Auth]];
    }

    constructor(private nav:NavController, private routes:Routes,
                private platform:Platform, private ngZone:NgZone,
                private videosProvider:VideosProvider, private auth:Auth) {
    }

    onClickBack() {
        this.nav.setRoot(this.routes.getPage(this.routes.VIDEOS))
    }


    getPicture() {

        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 200,
            targetHeight: 200
        }).then((imageData) => {
            this.base64TempImage = "data:image/jpeg;base64," + imageData;
            this.platform.ready().then(() => {
                this.upload();
            });

        }, (error) => {
            console.log("error ", error)
        });


        //navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 1});

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

    success = (result:any):void => {
        this.uploading = false;
        this.base64Image = result.response;


        let video = {
            "data": {
                "type": "videos",
                "attributes": {
                    "title": this.title,
                    "artist": this.artist,
                    "description": this.description,
                    "url": this.base64Image,
                    "author": this.auth.user.userId
                }
            }
        }

        this.videosProvider.add(video).then(
            data=> {
                console.log(data)
            }
        );

    }

    videoSuccess = (result:any):void => {
        this.uploading = false;
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
                console.log(data)
            }
        );

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

    upload = ():void => {
        let ft = new Transfer();
        let filename = new Date().toISOString() + ".jpg";
        let options = {
            fileKey: 'file',
            fileName: filename,
            mimeType: 'image/jpeg',
            chunkedMode: false,
            headers: {
                'Content-Type': undefined
            },
            params: {
                fileName: filename
            }
        };
        ft.onProgress(this.onProgress);
        ft.upload(this.base64TempImage, "http://1288378b.ngrok.io/videos/upload", options, false)
            .then((result:any) => {
                this.success(result);
            }).catch((error:any) => {
            this.failed(error);
        });
    }

    uploadVideo = ():void => {
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
