import {Component, OnInit} from "@angular/core";
import {Usuario} from "../../models/Usuario";
import {ModalController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {DomSanitizer} from '@angular/platform-browser';
import { LoadingController,
        ActionSheetController, 
        NavController,
        Events } from 'ionic-angular';
import {AddAgendaComponent} from "./add_agenda";
import {AgendaService} from "../../services/AgendaService";
import {RegistroAgendaComponent} from "./registro_agenda";

@Component({
    selector:"agenda",
    templateUrl:"agenda.html"
})
export class AgendaComponent{

  public listaAgendamentosPorData = [];
  public dataSelecionada = new Date();
  public usuarioLogado;  

  ngOnInit(){
        let loader = this.loadingCtrl.create({
            content: "Buscando agendamentos...",            
        });
        loader.present();
        this.storage.get('user').then((user) => {            
            this.usuarioLogado = JSON.parse(user);
            this.fetchData();
            loader.dismiss();
            
        });                               
  }
  constructor(  private modalController:ModalController,
                public storage: Storage,
                private sanitizer:DomSanitizer,
                public loadingCtrl: LoadingController,
                public actionSheetController:ActionSheetController,
                public navController:NavController,
                public agendaService:AgendaService,
                public events:Events){ 
                
                this.events.subscribe("agenda:registro", (item)=>{
                    console.log("AGENDA OK");
                    this.fetchData();
                });
                                                       
                
  }

  public fetchData(){
      if(this.usuarioLogado.tipo == 1){
            //profissional
            //paciente
            this.agendaService.getAgendamentosProfissional(this.usuarioLogado._id).subscribe(
                (sucess)=>{
                    this.listaAgendamentosPorData = sucess;
                }
            )
        }else{
            //paciente
            this.agendaService.getAgendamentosPaciente(this.usuarioLogado._id).subscribe(
                (sucess)=>{
                    this.listaAgendamentosPorData = sucess;
                }
            )
        }
  }


  public addAgendamento(){
      this.navController.push(AddAgendaComponent, {"usuario":this.usuarioLogado}).then();
  }

  public getImagem(item){
        return this.sanitizer.bypassSecurityTrustUrl("data:image/pngr;utf8;base64,"+ item.usuario.foto);        
  }

  public getStatusStyle(agenda){                 
      if(agenda.status == "NENHUM"){
          return {
            'border-left':"solid 4px  #FF5722",
            'margin-bottom': '4px'
          };
      }
      if(agenda.status == "ACEITO"){
          return {
            'border-left':"solid 4px  #4CAF50",
            'margin-bottom': '4px'
          };          
      }            
  }

  public showOptions(agenda){

    let actionSheet = this.actionSheetController.create({
        title: "Opções",
        buttons: this.getButtonsOptions(agenda)
    });
    actionSheet.present();

  }

  public getButtonsOptions(agenda){
      if(this.usuarioLogado.tipo == 1){
            //profissional
            //paciente
            if(agenda.status == "NENHUM"){                
                return [
                        {
                            text: 'Rejeitar',
                            handler: () => {
                                let loader = this.loadingCtrl.create({
                                    content: "Rejeitando o agendamento...",            
                                });
                                loader.present();
                                this.agendaService.rejeitarAgenda(agenda).subscribe(
                                    (sucess)=>{
                                        this.fetchData();
                                        loader.dismiss();
                                    }
                                )
                            }
                        },
                        {
                            text: 'Aceitar',
                            handler: () => {
                                let loader = this.loadingCtrl.create({
                                    content: "Aceitando o agendamento...",            
                                });
                                loader.present();
                                this.agendaService.aceitarAgenda(agenda).subscribe(
                                    (sucess)=>{
                                        this.fetchData();
                                        loader.dismiss();
                                    }
                                )
                            }
                        }        
                    ];
            }
        }else{
            //paciente
            if(agenda.status == "ACEITO"){
                return [
                        {
                            text: 'Registrar',
                            handler: () => {                                
                                this.registrarAgendamento(agenda);
                            }
                        }        
                    ];
            }    
        }      
      
  }

  public registrarAgendamento(agenda){
      this.navController.push(RegistroAgendaComponent, {
          "agendaAtual":agenda,
          "usuarioLogado":this.usuarioLogado          
      }).then();
  }

}
