import { Component } from '@angular/core';
import { Platform, Events, App } from 'ionic-angular';
import {NativeStorage} from 'ionic-native';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginComponent } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage = LoginComponent;

  constructor(platform: Platform,
              public events:Events,
              public app:App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      // NativeStorage.getItem("user").then(
      //   function(usuarioLogado){
      //     if(usuarioLogado){
      //       //existe
      //       this.rootPage = TabsPage;
      //     }
      //   }
      // )

      this.events.subscribe('logout', () => {                      
          //this.navController.setRoot(LoginComponent);
          this.app.getRootNav().setRoot(LoginComponent);
      });   
    });
  }
}
