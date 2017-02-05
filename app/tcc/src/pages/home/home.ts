import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  public buscarProximaImg(){
    let retorno = "assets/img/noticia1.jpg";
    return retorno;

  }

}
