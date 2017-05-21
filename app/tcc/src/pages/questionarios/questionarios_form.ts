import {Component, OnInit} from "@angular/core";
import {Usuario} from "../../models/Usuario";
import {UsuarioService} from '../../services/UsuarioService';
import {Storage} from "@ionic/storage";
import {DomSanitizer} from '@angular/platform-browser';
import {ModalController, 
        LoadingController,
        ActionSheetController,
        NavController,
        reorderArray,
        ToastController} from 'ionic-angular';

import {Questionario} from "../../models/Questionario";
import {Pergunta} from "../../models/Pergunta";
import {QuestionariosFormPerguntasComponent} from './questionarios_form_perguntas';
@Component({
    selector:"questionariosForm",
    templateUrl:'questionarios_form.html'
})

export class QuestionariosFormComponent{

    public usuarioLogado;
    public title:String;    
    public questionario:Questionario;
    ngOnInit(){
        this.title = "Add Questionários";        
        this.questionario = new Questionario();
        this.questionario.perguntas = new Array<Pergunta>();

    }

    constructor(public usuarioService:UsuarioService, 
                private modalController:ModalController,
                public storage: Storage,
                private sanitizer:DomSanitizer,
                public loadingCtrl: LoadingController,
                public actionSheetController:ActionSheetController,
                public navController:NavController,
                public toastController:ToastController){                    
                
    }

    reorderItem(indexes){
        this.questionario.perguntas = reorderArray(this.questionario.perguntas, indexes);
    }

    addPergunta(){
        let novaPergunta = new Pergunta();
        this.questionario.perguntas.push(novaPergunta);
    }
    showOptions(p:Pergunta){        
        let actionSheet = this.actionSheetController.create({
            title: p.pergunta.toString(),
            buttons: [
            {
                text: 'Editar',
                handler: () => {
                    let modal = this.modalController.create(QuestionariosFormPerguntasComponent, {
                        "pergunta":p
                    });
                    modal.present();                                                   
                    modal.onDidDismiss(data => {
                        if(data){
                            p = data;
                        }      
                    });
                }
            },
            {
                text: 'Excluir',                
                handler: () => {
                    let index= this.questionario.perguntas.indexOf(p);
                    this.questionario.perguntas.splice(index, 1);
                     let toast = this.toastController.create({
                        message: "Pergunta excluida com sucesso!",
                        duration: 3000,
                        position:"bottom"
                    });
                    toast.present();
                }
            }
            ]
        });
        actionSheet.present();
    }

}