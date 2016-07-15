import {Component, PLATFORM_DIRECTIVES, provide} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HeaderContent} from './components/header-content/header-content';
import {Routes} from './providers/routes/routes'
import {Endpoints} from './providers/endpoints/endpoints'
import {Auth} from './providers/auth/auth'

import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {Http} from '@angular/http';
import {Videos} from "./providers/videos/videos";

@Component({
  templateUrl: 'build/app.html',
  providers: [Videos],
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, private routes:Routes, private auth:Auth) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  ngOnInit() {
    this.rootPage = this.routes.getRootPage()
  }
}

ionicBootstrap(MyApp, [
  provide(PLATFORM_DIRECTIVES, {useValue: HeaderContent, multi: true}),
  [Routes, Endpoints, Auth],
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig, http);
    },
    deps: [Http]
  })
],{
  mode: 'md',
  platforms: {
    ios: {
      tabbarPlacement: 'top',
    }
  }
});
