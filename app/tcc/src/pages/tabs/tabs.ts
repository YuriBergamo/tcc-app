import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {AgendaComponent} from "../agenda/agenda";
import {SosComponent} from "../sos/sos";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AgendaComponent;
  tab3Root: any = SosComponent;
  tab4Root: any = SosComponent;

  constructor() {

  }
}
