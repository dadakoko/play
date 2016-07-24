import {Component} from '@angular/core';
import {NavController, Popover, Platform, ActionSheet, Alert} from 'ionic-angular';
import {Routes} from '../../providers/routes/routes';
import {Videos as VideosProvider} from '../../providers/videos/videos'
import {Auth} from "../../providers/auth/auth";
import {ActionPopover} from "../../components/action-popover/action-popover";

/*
 Generated class for the VideosPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    templateUrl: 'build/pages/videos/videos.html',
})
export class VideosPage {

    items:any = []
    username:string;

    /** Not normally mandatory but create bugs if ommited. **/
    static get parameters() {
        return [[Platform],[NavController], [Routes], [VideosProvider], [Auth]];
    }

    constructor(private platform: Platform, private nav:NavController,
                private routes:Routes, private videosProvider:VideosProvider,
                private auth:Auth) {
    }

    ionViewDidEnter() {
        this.videosProvider.load().then((data)=> {
            this.items = data;
        });
        this.username = this.auth.user.username;
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

    public deleteVideo(video) {
        console.log('swipe video delete :',video);

        let confirm = Alert.create({
            title: 'Delete '+video.attributes.title,
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
                        this.videosProvider.deleteVideo(video.id);
                    }
                }
            ]
        });

        this.nav.present(confirm);
    }

    openMenu(video) {
        let actionSheet = ActionSheet.create({
            title: video.attributes.title,
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    handler: () => {
                        console.log('Delete clicked');
                    }
                },
                {
                    text: 'Share',
                    icon: !this.platform.is('ios') ? 'share' : null,
                    handler: () => {
                        console.log('Share clicked');
                    }
                },
                {
                    text: 'Play',
                    icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
                    handler: () => {
                        console.log('Play clicked');
                    }
                },
                {
                    text: 'Favorite',
                    icon: !this.platform.is('ios') ? 'heart-outline' : null,
                    handler: () => {
                        console.log('Favorite clicked');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel', // will always sort to be on the bottom
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });

        this.nav.present(actionSheet);
    }


}
