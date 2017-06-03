import { Component, OnInit } from '@angular/core';

import { HomePage } from '../home/home';
import {AgendaComponent} from "../agenda/agenda";
import {SosComponent} from "../sos/sos";
import {ConfiUserComponent} from "../config/config_user";
import {PacienteComponent} from "../pacientes/paciente";
import {QuestionariosListaComponent} from "../questionarios/questionarios_lista";
import {Storage} from "@ionic/storage";
import {Usuario} from "../../models/Usuario";
import {Tab} from "../../models/Tab";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  homeRoot: any = HomePage;
  agendaRoot: any = AgendaComponent;
  sosRoot: any = SosComponent;
  confiUserRoot: any = ConfiUserComponent;
  pacienteRoot: any = PacienteComponent;
  usuarioLogado:Usuario = new Usuario();
  public tabs = [];

  ngOnInit(){        
      this.storage.get('user').then((user) => {
          this.usuarioLogado = JSON.parse(user);        
          this.tabs = [];
          if(this.usuarioLogado.tipo == "1"){
            //profissional            
            this.tabs.push(new Tab("Questionarios", QuestionariosListaComponent, "filing", "green"));
            this.tabs.push(new Tab("Pacientes", PacienteComponent, "people", "blue"));
            this.tabs.push(new Tab("Configuração", ConfiUserComponent, "settings", "red"));          
          }else{
            this.tabs.push(new Tab("Home", HomePage, "home", "green"));            
            this.tabs.push(new Tab("SOS", SosComponent, "medkit", "blue"));
            this.tabs.push(new Tab("Configuração", ConfiUserComponent, "settings", "red"));          
            
          }

          console.log("tabs", this.tabs);
      });        
  }
  constructor(public storage: Storage) {            
      
  }
}
