import {Component, OnInit} from '@angular/core';
import {NavController, 
        NavParams, 
        ModalController,
        ToastController,
        LoadingController} from "ionic-angular";
import {Agenda} from "../../models/Agenda";
import {SelectModalComponent} from "../util/modal_select";
import {AgendaService} from "../../services/AgendaService";



@Component({
    selector:"add-agenda",
    templateUrl:"add_agenda.html"
})

export class AddAgendaComponent implements OnInit{

    private agendaAtual:Agenda;
    public usuarioLogado;
    public isProfissional:Boolean = false;

    ngOnInit(){
      this.agendaAtual = new Agenda();
      this.agendaAtual.data = new Date();
      this.agendaAtual.questionario = {};
      this.agendaAtual.usuario = {};
      this.agendaAtual.profissional = {}; 

      this.usuarioLogado =this.navParams.get("usuario");
      if(this.usuarioLogado.tipo == 1){
          this.isProfissional = true;
          this.agendaAtual.profissional = this.usuarioLogado;
      }else{
          this.agendaAtual.usuario = this.usuarioLogado;
          this.agendaAtual.profissional = this.usuarioLogado.profissional;
          if(this.usuarioLogado.profissional == null){
              //exibe mensagem para vincular um profissional
          }
      }
    }

    constructor(private navController:NavController,
                private navParams:NavParams,
                private modalController:ModalController,
                private agendaService:AgendaService,
                private toastController:ToastController,
                private loadingCtrl:LoadingController){

    }

    public selecionarItem(item){
        let modal;
        if(item == "paciente"){
            modal = this.modalController.create(SelectModalComponent, {"paciente":true, "usuarioLogado":this.usuarioLogado});
        }
        if(item == "questionario"){
            modal = this.modalController.create(SelectModalComponent, {"questionario":true, "usuarioLogado":this.usuarioLogado});
        }

        modal.present();                                                   
        modal.onDidDismiss(data => {
            if(data.questionario){
                this.agendaAtual.questionario = data.questionario;
            }
            if(data.paciente){
                this.agendaAtual.usuario = data.paciente;
            }      
        });
        
    }


    public salvar(){        
        if(this.isProfissional){
            this.agendaAtual.status = "ACEITO";
        }else{
            this.agendaAtual.status = "NENHUM";
        }

        let loader = this.loadingCtrl.create({
            content: "Criando Agendamento...",            
        });
        loader.present();

        this.agendaService.gravarAgendamento(this.agendaAtual).subscribe(
            (sucess)=>{
                let toast = this.toastController.create({
                    message: "Agendamento criado com sucesso!",
                    duration: 2000,
                    position:"bottom"
                });
                loader.dismiss();
                toast.present();
                

                this.navController.pop().then();
            },
            (erro)=>{
                loader.dismiss();
                let toast = this.toastController.create({
                    message: "Opss... Algo de errado aconteceu!",
                    duration: 3000,
                    position:"bottom"
                });
                toast.present();
            }
        )
    }



}