import {Component, OnInit} from "@angular/core";
import {Usuario} from "../../models/Usuario";
import {QuestionarioService} from '../../services/QuestionarioService';
import {UsuarioService} from '../../services/UsuarioService';
import {Storage} from "@ionic/storage";
import {DomSanitizer} from '@angular/platform-browser';
import {QuestionariosFormComponent} from './questionarios_form';
import {ResponderQuestionarioComponent} from '../questionarios/responder_questionario';
import {RespostaQuestionario} from '../../models/RespostaQuestionario';

import {ModalController, 
        LoadingController,
        ActionSheetController, 
        NavController,
        NavParams} from 'ionic-angular';

@Component({
    selector:"perfil-responder-questionario",
    templateUrl:'perfil_responderQuestionario.html'
})

export class PerfilResponderQuestionarioComponent{

    public questionarios = [];
    public resposta;
    public usuarioLogado;
    public usuarioPaciente;
    ngOnInit(){

        this.resposta = new RespostaQuestionario();
        this.usuarioPaciente = this.navParams.get("usuarioPaciente");
        this.usuarioLogado = this.navParams.get("usuarioLogado");
        this.fetchQuestionarios();
                         
    }

    private fetchQuestionarios(){
        let loader = this.loadingCtrl.create({
            content: "Buscando questionários...",            
        });
        loader.present();
        this.questionarioService.buscarQuestionarios(this.usuarioLogado._id).subscribe(
                (sucess)=>{
                    this.questionarios = sucess;                    
                    loader.dismiss();
                },
                (err)=>{
                    console.log("ERR", err);
                    loader.dismiss();
                }
            )
    }

    constructor(public questionarioService:QuestionarioService, 
                public usuarioService:UsuarioService, 
                private modalController:ModalController,
                public storage: Storage,
                private sanitizer:DomSanitizer,
                public loadingCtrl: LoadingController,
                public actionSheetController:ActionSheetController,
                public navController:NavController,
                public navParams:NavParams){                          
                
    }

    public responder(questionario){
         this.navController.push(ResponderQuestionarioComponent, 
                        {
                         "usuarioPaciente":this.usuarioPaciente,   
                         "questionario":questionario,
                         "visualizando":false,
                         "resposta":this.resposta
                        }
                    ).then();
    }
    
    


}