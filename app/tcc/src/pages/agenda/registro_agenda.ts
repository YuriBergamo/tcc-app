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
    public visualizando =false;

    ngOnInit(){
        this.agendaAtual = this.navParams.get("agendaAtual");
        this.usuarioLogado = this.navParams.get("usuarioLogado");
        this.visualizando = this.navParams.get("visualizar");                                    
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
    public getStatusByAgenda(){
        if(this.agendaAtual.status == "ACEITO"){
            return "Aguardando o registro do usuário!";
        }
        if(this.agendaAtual.status == "RESPONDIDO"){
            return "Agendamento respondido!";
        }
        if(this.agendaAtual.status == "REJEITADO"){
            return "Agendamento rejeitado pelo profissional!";
        }
    }

    public visualizarQuestionario(){
        let loader = this.loadingCtrl.create({
            content: "Buscando respostas do questionario...",            
        });
        loader.present();

        this.agendaService.getRespostas(this.agendaAtual._id, this.agendaAtual.questionario._id).subscribe(
            (sucess)=>{
                loader.dismiss();                
                if(this.usuarioLogado.tipo == 1){
                    this.navController.push(ResponderQuestionarioComponent, {
                        "usuarioProfissional":this.usuarioLogado,
                        "questionario":this.agendaAtual.questionario,
                        "agenda":this.agendaAtual,
                        "respostas":sucess

                    }).then();
                }else if(this.usuarioLogado.tipo == 2){
                    this.navController.push(ResponderQuestionarioComponent, {
                        "usuarioPaciente":this.usuarioLogado,
                        "questionario":this.agendaAtual.questionario,
                        "agenda":this.agendaAtual,
                        "visualizando":true,
                        "respostas":sucess

                    }).then();
                }
            }
        )    
    }

}
