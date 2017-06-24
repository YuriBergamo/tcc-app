import {Component, OnInit} from "@angular/core";
import {Usuario} from "../../models/Usuario";
import { LoadingController,
        ActionSheetController, 
        NavController,
        NavParams,
        Events,
        ToastController } from 'ionic-angular';
import {AgendaService} from "../../services/AgendaService";
import {ResponderQuestionarioComponent} from "../questionarios/responder_questionario";

@Component({
    selector:"registro-agenda",
    templateUrl:"registro_agenda.html"
})
export class RegistroAgendaComponent{

    public agendaAtual;
    public usuarioLogado;  
    public statusQuestionario:String = "Pendente";

    ngOnInit(){
        this.agendaAtual = this.navParams.get("agendaAtual");
        this.usuarioLogado = this.navParams.get("usuarioLogado");        
                            
    }
    constructor(public loadingCtrl: LoadingController,
                public actionSheetController:ActionSheetController,
                public navController:NavController,
                public agendaService:AgendaService,
                public navParams:NavParams,
                public events:Events,
                public toastController:ToastController){     

            this.events.subscribe('registroQuestionario:agenda', (item) => {
                console.log("RELOAD", item);            
                if(this.statusQuestionario){
                    this.statusQuestionario = "Respondido";
                }
            });              
                
    }

    public responderQuestionario(){
        this.navController.push(ResponderQuestionarioComponent, {
            "usuarioPaciente":this.usuarioLogado,
            "questionario":this.agendaAtual.questionario,
            "agenda":this.agendaAtual

        }).then();
    }
    public salvar(){
        if(this.agendaAtual.questionario){
            if(this.statusQuestionario == "Pendente"){
                //exibir alerta
                return;
            }
        }

        this.agendaAtual.status = "RESPONDIDO";    

        this.agendaService.registrar(this.agendaAtual).subscribe(
            (sucess)=>{
                let toast = this.toastController.create({
                        message: "Agendamento registrado!",
                        duration: 2000,
                        position:"bottom"
                });
                toast.present();

                this.events.publish("agenda:registro", "item");

                this.navController.pop();
            }
        )
    }  

}
