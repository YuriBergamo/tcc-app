import {Component, OnInit} from "@angular/core";
import {Usuario} from "../../models/Usuario";
import {QuestionarioService} from '../../services/QuestionarioService';
import {Storage} from "@ionic/storage";
import {DomSanitizer} from '@angular/platform-browser';
import {ModalController, 
        LoadingController,
        ActionSheetController,
        NavController,
        reorderArray,
        ToastController,
        Events,
        NavParams} from 'ionic-angular';

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
    public erro:String; 
    public editando:Boolean
    ngOnInit(){
        this.editando = false;

        this.usuarioLogado = this.navParms.get('usuario');
        let questionarioParametro = this.navParms.get('questionario');
        
        if(!questionarioParametro){            
            this.title = "Novo Questionário";        
            this.questionario = new Questionario();
            this.questionario.perguntas = new Array<Pergunta>();
        }else{
            this.editando = true;
            this.title = "Editar Questionário";
            this.questionario = questionarioParametro;            
        }
                
        this.erro = null;

    }

    constructor(public questionarioService:QuestionarioService, 
                private modalController:ModalController,
                public storage: Storage,
                private sanitizer:DomSanitizer,
                public loadingCtrl: LoadingController,
                public actionSheetController:ActionSheetController,
                public navController:NavController,
                public toastController:ToastController,
                public events:Events,
                public navParms:NavParams){                    
                
    }

    salvar(){
        if(!this.questionario.nome || this.questionario.nome == ''){
            //todo fazer erro na tela
            this.erro="O questionario deve ter um nome!";            
            return;
        }

        if(this.questionario.perguntas == null || this.questionario.perguntas.length ==0){
            //todo fazer erro na tela
            this.erro="O questionario deve ter ao menos uma pergunta!";
            return;
        }

        this.questionario.perguntas.forEach(pergunta=>{
            if(pergunta.tipoResposta === "Multipla"){
                if(pergunta.respostaPossiveis == null || pergunta.respostaPossiveis.length == 0){
                    this.erro = pergunta.pergunta + " deve ter respostas!";
                    return;
                }
            }
        });
        
        let loader = this.loadingCtrl.create({
            content: "Salvando Questionário...",            
        });
        loader.present();
        if(!this.editando){
            this.questionarioService.salvarQuestionario(this.usuarioLogado._id, this.questionario).subscribe(
                (sucess)=>{
                    console.log("SUCESS", sucess);
                    //add na lista de questionarios                
                    this.events.publish("questionario:new", this.questionario);
                    //exibir toast
                    let toast = this.toastController.create({
                            message: "Questionário criado!",
                            duration: 3000,
                            position:"bottom"
                    });
                    toast.present();
                    loader.dismiss();
                    //voltar pra listagem
                    this.navController.pop();
                },
                (error)=>{
                    //exibir erro
                    console.log("ERROR", error);
                    loader.dismiss();
                }
            )
        }else{
            //fazer o put
            this.questionarioService.editarQuestionario(this.questionario).subscribe(
                (sucess)=>{
                    console.log("SUCESS", sucess);
                    //add na lista de questionarios                
                    this.events.publish("questionario:new", this.questionario);
                    //exibir toast
                    let toast = this.toastController.create({
                            message: "Questionário editado com sucesso!",
                            duration: 3000,
                            position:"bottom"
                    });
                    toast.present();
                    loader.dismiss();
                    //voltar pra listagem
                    this.navController.pop();
                },
                (error)=>{
                    //exibir erro
                    console.log("ERROR", error);
                    loader.dismiss();
                }
            )
            //apagar o questionario e fazer outro com o mesmo id
        }
        
        
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