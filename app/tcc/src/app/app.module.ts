import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//components
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AgendaComponent } from '../pages/agenda/agenda';
import {SosComponent} from "../pages/sos/sos";


//services
import {TutorialService} from "../services/TutorialService";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    AgendaComponent,
    SosComponent,
    TutorialService
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    AgendaComponent,
    SosComponent,
    
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
