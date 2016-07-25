import {Component} from '@angular/core';
import {NavController, Platform, ActionSheet, Alert} from 'ionic-angular';
import {Routes} from '../../providers/routes/routes';
import {Videos as VideosProvider} from '../../providers/videos/videos'
import {Auth} from "../../providers/auth/auth";
import {Camera, Transfer} from "ionic-native/dist/index";
import {GroupBy} from "../../pipes/groupby";
import {SortAsc} from "../../pipes/sortasc";

/*
 Generated class for the VideosPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    templateUrl: 'build/pages/videos/videos.html',
    styles: [`
      .img_thumb {
        background-size: contain;
        background-position: center center;
        height: 80px;
        width: 80px;
      }
    `],
    pipes:[SortAsc, GroupBy]
})
export class VideosPage {

    items:any = []
    username:string;
    base64Image:string;
    uploading:boolean = true;
    base64TempImage:string;


    /** Not normally mandatory but create bugs if ommited. **/
    static get parameters() {
        return [[Platform], [NavController], [Routes], [VideosProvider], [Auth]];
    }

    constructor(private platform:Platform, private nav:NavController,
                private routes:Routes, private videosProvider:VideosProvider,
                private auth:Auth) {
        this.videosProvider.load().then((data)=> {
            this.items = data;
        });
        this.username = this.auth.user.username;
    }

    ionViewDidEnter() {
    }

    selectItem(id) {
        this.nav.insert(0, this.routes.getPage(this.routes.VIDEO), {id: id})
    }

    logout() {
        this.auth.logout()
        this.nav.setRoot(this.routes.getRootPage())
    }

    addVideo() {
        this.nav.insert(0, this.routes.getPage(this.routes.ADD))
    }


    deleteVideo(video) {
        console.log('swipe video delete :', video);

        let confirm = Alert.create({
            title: 'Delete ' + video.attributes.title,
            message: 'Are you sure you want to delete the video?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Cancel delete ', video.attributes.title);
                    }
                },
                {
                    text: 'Ok',
                    handler: () => {
                        console.log('start delete ', video.attributes.title);
                        let self = this;
                        this.videosProvider.deleteVideo(video.id).then((data)=> {
                            self.items = data.data;
                        })
                    }
                }
            ]
        });

        this.nav.present(confirm);
    }

    openMenu(ev, video) {
        if (ev.target.closest("button") != null) {
            this.selectItem(video.id);
            return;
        }
        let actionSheet = ActionSheet.create({
            title: video.attributes.title,
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => {
                        console.log('start delete ', video.attributes.title);
                        let self = this;
                        this.videosProvider.deleteVideo(video.id).then((data)=> {
                            self.items = data.data;
                        })
                    }
                },
                {
                    text: 'Share',
                    icon: 'share',
                    handler: () => {
                        console.log('Share clicked');
                    }
                },
                {
                    text: 'View',
                    icon: 'arrow-dropright-circle',
                    handler: () => {
                        this.selectItem(video.id);
                    }
                },
                {
                    text: 'Favorite',
                    icon: 'heart-outline',
                    handler: () => {
                        console.log('Favorite clicked');
                    }
                },
                {
                    text: 'Thumbnail',
                    icon: 'ios-camera',
                    handler: () => {
                        this.getPicture();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel', // will always sort to be on the bottom
                    icon: 'close',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });

        this.nav.present(actionSheet);
    }


    getPicture() {

        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 200,
            targetHeight: 200
        }).then((imageData) => {
            this.base64TempImage = "data:image/jpeg;base64," + imageData;
            this.platform.ready().then(() => {
                //this.upload();
            });

        }, (error) => {
            console.log("error ", error)
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
        ft.upload(this.base64TempImage, "http://1288378b.ngrok.io/videos/upload", options, false)
            .then((result:any) => {
                this.success(result);
            }).catch((error:any) => {
            this.failed(error);
        });
    }

    failed = (err:any):void => {
        let code = err.code;
        alert("Failed to upload image. Code: " + code);
    }

    success = (result:any):void => {
        this.uploading = false;
        this.base64Image = result.response;

    }




}
